from datetime import datetime
import os
import csv
import re

from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Crop, ClimateZone, CropZone, PestAlert
from .utils.response import api_response


# =========================
# UTILITIES
# =========================

def get_season():
    month = datetime.now().month
    return "dry" if month in [11, 12, 1, 2, 3] else "rainy"


def normalize(text):
    return re.sub(r"[^a-z0-9]+", " ", (text or "").lower()).strip()


def slugify(value):
    slug = re.sub(r"[^a-z0-9]+", "-", (value or "").lower()).strip("-")

    if slug.startswith("semi-arid"):
        return "semi-arid"
    if slug == "tropical-rainforest":
        return "coastal"
    return slug


def find_crop(name):
    if not name:
        return None

    crop = Crop.objects.filter(name__iexact=name).first()
    if crop:
        return crop

    norm = normalize(name)

    for c in Crop.objects.all():
        if c.name and normalize(c.name) == norm:
            return c
        if c.name and (norm in normalize(c.name) or normalize(c.name) in norm):
            return c

    return None


def find_zone(zone_name):
    if not zone_name:
        return None

    zone = ClimateZone.objects.filter(name__iexact=zone_name).first()
    if zone:
        return zone

    zone = ClimateZone.objects.filter(name__icontains=zone_name).first()
    if zone:
        return zone

    norm = normalize(zone_name)

    for z in ClimateZone.objects.all():
        z_norm = normalize(z.name)
        z_slug = slugify(z.name)

        if (
            z_norm == norm
            or norm in z_norm
            or z_norm in norm
            or z_slug == zone_name.lower()
            or z_slug == norm
        ):
            return z

    return None


def get_recommendation(crop, zone, season):
    return (
        CropZone.objects.filter(crop=crop, zone=zone, season=season).first()
        or CropZone.objects.filter(crop=crop, zone=zone, season="all").first()
    )


def get_alert(crop, zone, season):
    return (
        PestAlert.objects.filter(crop=crop, zone=zone, season=season).first()
        or PestAlert.objects.filter(crop=crop, zone=zone, season="all").first()
    )


def get_zone_with_meta(zone_name):
    zones = ClimateZone.objects.all()

    available = [
        {"id": slugify(z.name), "name": z.name}
        for z in zones
    ]

    zone = find_zone(zone_name)

    if not zone:
        zone = zones.first() if zones.exists() else None
        return zone, True, available

    return zone, False, available


# =========================
# CROP LIST
# =========================

@api_view(["GET"])
def crop_list(request):
    crops = Crop.objects.all()

    data = []

    for crop in crops:
        scores = {
            slugify(cz.zone.name): cz.suitability_score
            for cz in CropZone.objects.filter(crop=crop)
        }

        data.append({
            "id": crop.id,
            "name": crop.name,
            "emoji": crop.emoji,
            "category": crop.category,
            "soil_type": crop.soil_type,
            "growth_duration_days": crop.growth_duration_days,
            "scores": scores,
        })

    return Response(data)


# =========================
# RECOMMEND CROP
# =========================

@api_view(["POST"])
def recommend_crop(request):
    crop = find_crop(request.data.get("crop"))
    zone = find_zone(request.data.get("zone"))
    season = get_season()

    if not crop:
        return Response({"error": "Crop not found"}, status=404)
    if not zone:
        return Response({"error": "Zone not found"}, status=404)

    rec = get_recommendation(crop, zone, season)

    if not rec:
        return Response({"error": "No recommendation available"}, status=404)

    return Response(api_response(
        data={
            "crop": crop.name,
            "zone": zone.name,
            "season": season,
            "suitability_score": rec.suitability_score,
            "risk_level": rec.risk_level,
            "yield_expectation": rec.yield_expectation,
            "care_notes": rec.care_notes,
            "disease_risks": rec.disease_risks,
        },
        message="Recommendation generated"
    ))


# =========================
# PEST ALERT
# =========================

@api_view(["POST"])
def pest_alert(request):
    crop = find_crop(request.data.get("crop"))
    zone = find_zone(request.data.get("zone"))
    season = get_season()

    if not crop:
        return Response({"error": "Crop not found"}, status=404)
    if not zone:
        return Response({"error": "Zone not found"}, status=404)

    alert = get_alert(crop, zone, season)

    if not alert:
        return Response({"error": "No pest alert data"}, status=404)

    return Response({
        "crop": crop.name,
        "zone": zone.name,
        "season": season,
        "pest_risk_level": alert.pest_risk_level,
        "main_threat": alert.main_threat,
        "prevention": alert.prevention
    })


# =========================
# CROP DETAIL
# =========================

@api_view(["GET"])
def crop_detail(request, name):
    zone_name = request.GET.get("zone")

    if not zone_name:
        return Response({"error": "zone is required"}, status=400)

    crop = find_crop(name)
    zone, used_default, available_zones = get_zone_with_meta(zone_name)
    season = get_season()

    if not crop:
        return Response({"error": "Crop not found"}, status=404)
    if not zone:
        return Response({"error": "No climate zones configured"}, status=404)

    rec = get_recommendation(crop, zone, season)
    alert = get_alert(crop, zone, season)

    scores = {
        slugify(cz.zone.name): cz.suitability_score
        for cz in CropZone.objects.filter(crop=crop)
    }

    seasons = {
        cz.season for cz in CropZone.objects.filter(crop=crop)
        if cz.season and cz.season != "all"
    }

    risks = []

    if rec:
        risks.append({
            "label": "Disease Risks",
            "level": rec.risk_level,
            "note": rec.disease_risks,
        })

    if alert:
        risks.append({
            "label": "Pest Risk",
            "level": alert.pest_risk_level,
            "note": alert.main_threat,
        })

    data = {
        "id": crop.id,
        "name": crop.name,
        "emoji": crop.emoji or "🌱",
        "tags": [crop.category] if crop.category else [],
        "growthDays": crop.growth_duration_days,

        "soil": crop.soil_type,
        "sunlight": getattr(crop, "sunlight_requirement", None),
        "water": getattr(crop, "water_requirement", None),
        "fertilizer": getattr(crop, "fertilizer", None),
        "planting": getattr(crop, "planting", None),

        "bestSeason": list(seasons),

        "zone": zone.name,
        "zoneId": slugify(zone.name),
        "used_default_zone": used_default,
        "season": season,

        "scores": scores,
        "risks": risks,

        "yieldExpectation": rec.yield_expectation if rec else None,
        "careNotes": rec.care_notes if rec else None,

        "availableZones": available_zones,
    }

    return Response(api_response(
        data=data,
        message="Crop details loaded successfully"
    ))


# =========================
# CROP INTELLIGENCE
# =========================

def calculate_crop_score(rec, alert):
    score = rec.suitability_score or 0

    if rec.yield_expectation == "high":
        score += 2
    elif rec.yield_expectation == "medium":
        score += 1

    if rec.risk_level == "high":
        score -= 2
    elif rec.risk_level == "medium":
        score -= 1

    if alert:
        if alert.pest_risk_level == "high":
            score -= 2
        elif alert.pest_risk_level == "medium":
            score -= 1

    return max(0, min(10, round(score, 2)))


@api_view(["GET"])
def crop_intelligence(request):
    zone_name = request.GET.get("zone")

    if not zone_name:
        return Response({"error": "zone is required"}, status=400)

    zone = find_zone(zone_name)

    if not zone:
        return Response({"error": "Zone not found"}, status=404)

    season = get_season()

    results = []

    for crop in Crop.objects.all():
        rec = get_recommendation(crop, zone, season)
        if not rec:
            continue

        alert = get_alert(crop, zone, season)
        score = calculate_crop_score(rec, alert)

        reasons = []

        if rec.suitability_score >= 7:
            reasons.append("Good climate match")
        elif rec.suitability_score >= 5:
            reasons.append("Moderate climate match")
        else:
            reasons.append("Weak climate match")

        if rec.yield_expectation == "high":
            reasons.append("High yield potential")

        if alert and alert.pest_risk_level == "low":
            reasons.append("Low pest risk")

        results.append({
            "crop": crop.name,
            "score": score,
            "risk": rec.risk_level,
            "yield": rec.yield_expectation,
            "reasons": reasons
        })

    results.sort(key=lambda x: x["score"], reverse=True)

    return Response(api_response(
        data={
            "zone": zone.name,
            "season": season,
            "ranking": results[:5],
            "scores": {r["crop"].lower(): r["score"] for r in results},
        },
        message="Intelligence ranking generated"
    ))


# =========================
# MARKET PRICES
# =========================

@api_view(["GET"])
def market_prices(request):
    file_path = os.path.join(settings.BASE_DIR, "crops", "data", "market_prices.csv")

    if not os.path.exists(file_path):
        return Response({"error": "Market price file not found"}, status=404)

    with open(file_path, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    return JsonResponse(rows, safe=False)
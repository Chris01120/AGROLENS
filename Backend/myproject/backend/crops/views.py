from datetime import datetime

import pandas as pd
from django.conf import settings
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse


import csv
from .models import Crop, ClimateZone, CropZone, PestAlert
from django.db.models import Q
import re
from .utils.response import api_response

file_path = os.path.join(settings.BASE_DIR, "crops", "data", "market_prices.csv")


# -----------------------------------
# SEASON DETECTION
# -----------------------------------
def get_season():
    month = datetime.now().month

    if month in [11, 12, 1, 2, 3]:
        return "dry"
    return "rainy"


def find_zone(zone_name):
    """Find a ClimateZone by name or a tolerant id-like string.

    Attempts exact name match, case-insensitive contains, normalized name
    compare, and slug-id matching so frontend zone ids like 'coastal',
    'savanna', and 'semi-arid' map correctly to backend zone names.
    """
    if not zone_name:
        return None

    # exact match
    zone = ClimateZone.objects.filter(name__iexact=zone_name).first()
    if zone:
        return zone

    # case-insensitive contains
    zone = ClimateZone.objects.filter(name__icontains=zone_name).first()
    if zone:
        return zone

    # normalized comparison and slug-id matching
    def normalize(s):
        return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()

    norm = normalize(zone_name)
    for z in ClimateZone.objects.all():
        zname_norm = normalize(z.name)
        zslug = slugify(z.name)
        if (
            zname_norm == norm
            or norm in zname_norm
            or zname_norm in norm
            or zslug == zone_name.lower()
            or zslug == norm
        ):
            return z

    return None


def find_crop(name):
    """Find a Crop by name or a tolerant id-like string."""
    if not name:
        return None

    crop = Crop.objects.filter(name__iexact=name).first()
    if crop:
        return crop

    def normalize(s):
        return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()

    norm = normalize(name)
    for c in Crop.objects.all():
        if c.name and normalize(c.name) == norm:
            return c
        if c.name and (norm in normalize(c.name) or normalize(c.name) in norm):
            return c

    return None


def slugify(value):
    slug = re.sub(r"[^a-z0-9]+", "-", (value or "").lower()).strip("-")
    if slug.startswith("semi-arid"):
        return "semi-arid"
    if slug == "tropical-rainforest":
        return "coastal"
    return slug


def get_zone_with_meta(zone_name):
    """Return (zone, used_default, available_zones).

    If the requested zone cannot be found, return a sensible default
    (first configured ClimateZone) and mark used_default True. Also
    return a list of available zones for client guidance.
    """
    zones_qs = ClimateZone.objects.all()
    available = [{"id": slugify(z.name), "name": z.name} for z in zones_qs]
    zone = find_zone(zone_name)
    used_default = False
    if not zone:
        zone = zones_qs.first() if zones_qs.exists() else None
        used_default = True
    return zone, used_default, available


# -----------------------------------
# CROP LIST
# -----------------------------------
@api_view(["GET"])
def crop_list(request):
    crops = Crop.objects.all()

    data = []

    for crop in crops:

        scores = {}

        crop_zones = CropZone.objects.filter(crop=crop)

        for cz in crop_zones:
            scores[slugify(cz.zone.name)] = cz.suitability_score

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


# -----------------------------------
# RECOMMEND CROP
# -----------------------------------
@api_view(["POST"])
def recommend_crop(request):

    crop_name = request.data.get("crop")
    zone_name = request.data.get("zone")

    season = get_season()

    try:
        crop = find_crop(crop_name)
        if not crop:
            return Response({"error": "Crop not found"}, status=404)
        zone = find_zone(zone_name)

        if not zone:
            return Response({"error": "Zone not found"}, status=404)

        recommendation = CropZone.objects.filter(
            crop=crop,
            zone=zone,
            season=season
        ).first()

        if not recommendation:
            recommendation = CropZone.objects.filter(
                crop=crop,
                zone=zone,
                season="all"
            ).first()

        if not recommendation:
            return Response({"error": "No recommendation available"}, status=404)

        return Response(api_response(
            data={
                "crop": crop.name,
                "zone": zone.name,
                "season": season,
                "suitability_score": recommendation.suitability_score,
                "risk_level": recommendation.risk_level,
                "yield_expectation": recommendation.yield_expectation,
                "care_notes": recommendation.care_notes,
                "disease_risks": recommendation.disease_risks,
            },
            message="Recommendation generated"
        ))

    except Crop.DoesNotExist:
        return Response({"error": "Crop not found"}, status=404)

    except ClimateZone.DoesNotExist:
        return Response({"error": "Zone not found"}, status=404)


# -----------------------------------
# PEST ALERT
# -----------------------------------
@api_view(["POST"])
def pest_alert(request):

    crop_name = request.data.get("crop")
    zone_name = request.data.get("zone")

    season = get_season()

    try:
        crop = find_crop(crop_name)
        if not crop:
            return Response({"error": "Crop not found"}, status=404)
        zone = find_zone(zone_name)

        if not zone:
            return Response({"error": "Zone not found"}, status=404)

        alert = PestAlert.objects.filter(
            crop=crop,
            zone=zone,
            season=season
        ).first()

        if not alert:
            alert = PestAlert.objects.filter(
                crop=crop,
                zone=zone,
                season="all"
            ).first()

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

    except Crop.DoesNotExist:
        return Response({"error": "Crop not found"}, status=404)

    except ClimateZone.DoesNotExist:
        return Response({"error": "Zone not found"}, status=404)


# -----------------------------------
# CROP DETAIL (INTELLIGENCE BASE)
# -----------------------------------
@api_view(["GET"])
def crop_detail(request, name):

    zone_name = request.GET.get("zone")

    if not zone_name:
        return Response({"error": "zone is required"}, status=400)

    try:
        crop = find_crop(name)
        if not crop:
            return Response({"error": "Crop not found"}, status=404)
        zone, used_default, available_zones = get_zone_with_meta(zone_name)

        if not zone:
            return Response({"error": "No climate zones configured"}, status=404)

        season = get_season()

        recommendation = CropZone.objects.filter(
            crop=crop,
            zone=zone,
            season=season
        ).first() or CropZone.objects.filter(
            crop=crop,
            zone=zone,
            season="all"
        ).first()

        alert = PestAlert.objects.filter(
            crop=crop,
            zone=zone,
            season=season
        ).first() or PestAlert.objects.filter(
            crop=crop,
            zone=zone,
            season="all"
        ).first()
        # Build a frontend-friendly response shape
        # tags / bestSeason may not exist on the model; attempt to derive or fallback
        tags = getattr(crop, "tags", None)
        if tags is None:
            # fallback to category as a single tag
            tags = [crop.category] if getattr(crop, "category", None) else []

        # gather all zone scores for this crop, keyed by normalized frontend zone id
        zones = CropZone.objects.filter(crop=crop)
        scores = {}
        seasons_set = set()
        for cz in zones:
            zname = cz.zone.name
            scores[slugify(zname)] = cz.suitability_score
            if cz.season and cz.season != "all":
                seasons_set.add(cz.season)

        best_seasons = list(seasons_set) if seasons_set else getattr(crop, "best_season", []) or []

        # combine disease risks from CropZone and pest alerts into an array
        risks_array = []
        # disease_risks stored as text in CropZone — try to parse as JSON list, else include as note
        if recommendation and getattr(recommendation, "disease_risks", None):
            dr = recommendation.disease_risks
            risks_array.append({
                "label": "Disease Risks",
                "level": recommendation.risk_level or "Unknown",
                "note": dr,
            })

        if alert:
            risks_array.append({
                "label": "Pest Risk",
                "level": alert.pest_risk_level,
                "note": alert.main_threat,
            })

        data = {
            "id": crop.id,
            "name": crop.name,
            "emoji": getattr(crop, "emoji", "🌱"),
            "tags": tags,
            "growthDays": crop.growth_duration_days,

            "soil": getattr(crop, "soil_type", None),
            "sunlight": getattr(crop, "sunlight_requirement", None),
            "water": getattr(crop, "water_requirement", None),
            "fertilizer": getattr(crop, "fertilizer", None) or None,
            "planting": getattr(crop, "planting", None) or None,

            "bestSeason": best_seasons,

            "zone": zone.name,
            "zoneId": slugify(zone.name),
            "zoneName": zone.name,
            "used_default_zone": used_default,
            "season": season,

            "scores": scores,

            "risks": risks_array,

            "yieldExpectation": recommendation.yield_expectation if recommendation else None,
            "careNotes": recommendation.care_notes if recommendation else None,
        }

        # include available zones to help frontends correct requests
        data["availableZones"] = available_zones

        return Response(api_response(
            data=data,
            message="Crop details loaded successfully"
        ))

    except Crop.DoesNotExist:
        return Response({"error": "Crop not found"}, status=404)

    except ClimateZone.DoesNotExist:
        return Response({"error": "Zone not found"}, status=404)
    


def calculate_crop_score(recommendation, alert):
    """
    Simple intelligence scoring system (rule-based AI simulation)
    """

    score = recommendation.suitability_score or 0

    # Yield boost
    if recommendation.yield_expectation == "high":
        score += 2
    elif recommendation.yield_expectation == "medium":
        score += 1

    # Risk penalty
    if recommendation.risk_level == "high":
        score -= 2
    elif recommendation.risk_level == "medium":
        score -= 1

    # Pest risk penalty
    if alert:
        if alert.pest_risk_level == "high":
            score -= 2
        elif alert.pest_risk_level == "medium":
            score -= 1

    score = round(score, 2)
    return max(0, min(10, score))

@api_view(["GET"])
def crop_intelligence(request):
    zone_name = request.GET.get("zone")

    if not zone_name:
        return Response({"error": "zone is required"}, status=400)

    try:
        zone = find_zone(zone_name)

        if not zone:
            return Response({"error": "Zone not found"}, status=404)
        season = get_season()

        crops = Crop.objects.all()

        results = []

        for crop in crops:

            recommendation = CropZone.objects.filter(
                crop=crop,
                zone=zone,
                season=season
            ).first() or CropZone.objects.filter(
                crop=crop,
                zone=zone,
                season="all"
            ).first()

            if not recommendation:
                continue

            alert = PestAlert.objects.filter(
                crop=crop,
                zone=zone,
                season=season
            ).first() or PestAlert.objects.filter(
                crop=crop,
                zone=zone,
                season="all"
            ).first()

            score = calculate_crop_score(recommendation, alert)

            # Simple explanation engine
            reasons = []

            if recommendation.suitability_score >= 7:
                reasons.append("Good climate match")
            elif recommendation.suitability_score >= 5:
                reasons.append("Moderate climate match")
            else:
                reasons.append("Weak climate match")

            if recommendation.yield_expectation == "high":
                reasons.append("High yield potential")

            if alert and alert.pest_risk_level == "low":
                reasons.append("Low pest risk")

            results.append({
                "crop": crop.name,
                "score": score,
                "risk": recommendation.risk_level,
                "yield": recommendation.yield_expectation,
                "reasons": reasons
            })

        # Sort best crops first
        results = sorted(results, key=lambda x: x["score"], reverse=True)
        score_map = {item["crop"].lower(): item["score"] for item in results}

        return Response(api_response(
            data={
                "zone": zone.name,
                "season": season,
                "ranking": results[:5],  # top 5 crops
                "scores": score_map,
            },
            message="Intelligence ranking generated"
        ))

    except ClimateZone.DoesNotExist:
        return Response({"error": "Zone not found"}, status=404)
    



@api_view(["GET"])
def market_prices(request):

    file_path = os.path.join(
        settings.BASE_DIR,
        "crops",
        "data",
        "market_prices.csv"
    )

    rows=[]

    with open(
        file_path,
        encoding="utf-8"
    ) as f:

        reader=csv.DictReader(f)

        for row in reader:

            rows.append(row)

    return JsonResponse(
        rows,
        safe=False
    )
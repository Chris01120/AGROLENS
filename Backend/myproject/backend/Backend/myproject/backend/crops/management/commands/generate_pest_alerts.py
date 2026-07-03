from django.core.management.base import BaseCommand
from crops.models import Crop, ClimateZone, PestAlert


class Command(BaseCommand):
    help = "Auto-generate PestAlerts for all crops and zones"

    def handle(self, *args, **kwargs):

        crops = Crop.objects.all()
        zones = ClimateZone.objects.all()

        created_count = 0
        updated_count = 0

        for crop in crops:
            for zone in zones:

                # -----------------------------
                # SIMPLE RULE ENGINE
                # -----------------------------
                zone_name = zone.name.lower()
                crop_name = crop.name.lower()

                # Default values
                pest_risk_level = "medium"
                main_threat = "general pests"
                prevention = "monitor regularly"

                # 🌵 Arid zones
                if "arid" in zone_name or "sahel" in zone_name:
                    pest_risk_level = "low"
                    main_threat = "drought stress pests"
                    prevention = "mulching + drought control"

                # 🌧 Rainy zones
                elif "rain" in zone_name or "savanna" in zone_name:
                    pest_risk_level = "high"
                    main_threat = "fungal infections & insects"
                    prevention = "fungicide + drainage control"

                # 🌳 Forest zones
                elif "forest" in zone_name:
                    pest_risk_level = "high"
                    main_threat = "high humidity pests"
                    prevention = "airflow + disease monitoring"

                # 🌾 Crop-specific tweaks
                if crop_name in ["rice"]:
                    pest_risk_level = "high"
                    main_threat = "stem borers, blast disease"
                    prevention = "water management + resistant varieties"

                elif crop_name in ["cassava"]:
                    pest_risk_level = "medium"
                    main_threat = "mosaic virus"
                    prevention = "use clean cuttings"

                elif crop_name in ["maize"]:
                    main_threat = "fall armyworm"
                    prevention = "early spraying + scouting"

                # -----------------------------
                # CREATE OR UPDATE
                # -----------------------------
                obj, created = PestAlert.objects.update_or_create(
                    crop=crop,
                    zone=zone,
                    season="all",
                    defaults={
                        "pest_risk_level": pest_risk_level,
                        "main_threat": main_threat,
                        "prevention": prevention,
                    }
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Done! Created: {created_count}, Updated: {updated_count}"
        ))



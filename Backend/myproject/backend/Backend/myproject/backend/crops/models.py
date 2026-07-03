from django.db import models


class Crop(models.Model):
    name = models.CharField(max_length=100, unique=True)

    category = models.CharField(max_length=50)

    soil_type = models.CharField(max_length=100)

    growth_duration_days = models.IntegerField()

    sunlight_requirement = models.CharField(max_length=50)

    water_requirement = models.CharField(max_length=50)

    description = models.TextField(blank=True)

    emoji = models.CharField(max_length=10, default="🌱")

    # NEW FIELDS
    fertilizer = models.TextField(blank=True)

    planting = models.TextField(blank=True)

    care_notes = models.TextField(blank=True)

    tags = models.JSONField(default=list, blank=True)

    best_season = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name

class ClimateZone(models.Model):
    name = models.CharField(max_length=100)

    rainfall_level = models.CharField(max_length=50)

    humidity_level = models.CharField(max_length=50)

    temperature_range = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    



class CropZone(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)

    zone = models.ForeignKey(ClimateZone, on_delete=models.CASCADE)

    suitability_score = models.IntegerField()

    risk_level = models.CharField(max_length=20)

    yield_expectation = models.CharField(max_length=50)

    care_notes = models.TextField()

    disease_risks = models.TextField(blank=True)

    season = models.CharField(max_length=20, default="all")

    def __str__(self):
        return f"{self.crop.name} - {self.zone.name}"
    


class PestAlert(models.Model):

    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)
    zone = models.ForeignKey(ClimateZone, on_delete=models.CASCADE)

    season = models.CharField(max_length=20)

    pest_risk_level = models.CharField(max_length=20)

    main_threat = models.CharField(max_length=100)

    prevention = models.TextField()

    def __str__(self):
        return f"{self.crop.name} - {self.zone.name} - {self.season}"
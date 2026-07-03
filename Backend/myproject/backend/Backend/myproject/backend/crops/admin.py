from django.contrib import admin
from .models import Crop, ClimateZone, CropZone, PestAlert

admin.site.register(Crop)
admin.site.register(ClimateZone)
admin.site.register(CropZone)
admin.site.register(PestAlert)
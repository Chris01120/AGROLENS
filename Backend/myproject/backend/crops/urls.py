from django.urls import path
from .views import (
    crop_list,
    recommend_crop,
    pest_alert,
    crop_detail,
    crop_intelligence
)
from .views import market_prices

urlpatterns = [
    path("crops/", crop_list),
    path("recommend/", recommend_crop),
    path("pest-alert/", pest_alert),
    path("crops/<str:name>/detail/", crop_detail),
    path("markets/", market_prices),

    # 🔥 NEW INTELLIGENCE ENDPOINT
    path("intelligence/", crop_intelligence),
]
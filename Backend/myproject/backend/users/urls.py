from django.urls import path
from .views import test_api, register_user, login_user

urlpatterns = [
    path('test/', test_api),
    path('register/', register_user),
    path('login/', login_user),
]
import os
from django.utils.deprecation import MiddlewareMixin

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000,http://127.0.0.1:8000",
    ).split(",")
    if origin.strip()
]
ALLOW_ALL_ORIGINS = "*" in CORS_ALLOWED_ORIGINS


class DevCorsMiddleware(MiddlewareMixin):
    """
    Development CORS middleware. Allows localhost origins by default and
    honors CORS_ALLOWED_ORIGINS when set.
    """
    def process_response(self, request, response):
        origin = request.META.get("HTTP_ORIGIN")
        if not origin:
            return response

        if ALLOW_ALL_ORIGINS:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
        elif origin in CORS_ALLOWED_ORIGINS or origin.startswith("http://localhost:") or origin.startswith("http://127.0.0.1:"):
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
        else:
            return response

        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response

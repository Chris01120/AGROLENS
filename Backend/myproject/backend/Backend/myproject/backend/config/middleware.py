from django.utils.deprecation import MiddlewareMixin


class DevCorsMiddleware(MiddlewareMixin):
    """
    Simple development CORS middleware. Allows localhost and 127.0.0.1 origins.
    Do NOT use in production.
    """
    def process_response(self, request, response):
        origin = request.META.get('HTTP_ORIGIN')
        if origin and (origin.startswith('http://localhost:') or origin.startswith('http://127.0.0.1:')):
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Credentials'] = 'true'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response

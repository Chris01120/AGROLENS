def api_response(
    data=None,
    message="",
    success=True,
):

    return {
        "success": success,
        "message": message,
        "data": data
    }
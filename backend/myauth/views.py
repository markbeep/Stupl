from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def my_login(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response("User logged in")
    else:
        return HttpResponseForbidden()

def my_logout(request):
    if request.user.is_authenticated:
        logout(request)
        return Response("User logged out")
    else:
        return HttpResponseBadRequest()

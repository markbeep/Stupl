from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

@api_view(["GET"])
def insert_test_user(request):
    new_user = User(username="test", password="test", email="test@test.com")
    new_user.save()
    return Response("Created ya boi Test")

@api_view(["POST"])
def my_login(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response("User logged in")
    else:
        return HttpResponseForbidden()

@api_view(["POST"])
def my_logout(request):
    if request.user.is_authenticated:
        logout(request)
        return Response("User logged out")
    else:
        return HttpResponseBadRequest()


from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(["GET"])
def insert_test_user(request):
    new_user = User(username="test", password="test", email="test@test.com")
    new_user.save()
    return Response("Created ya boi Test")

@api_view(["POST", "GET"])
def my_login(request):
    print(request.POST)
    try:
        email = request.POST["email"]
        password = request.POST["password"]
    except KeyError:
        email = "test"
        password = "test"
    user = authenticate(request, username=email, password=password)
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

@login_required(login_url="/auth/login")
def logged_in():
    return Response("Logged in successfully")

def register(request):
    ...

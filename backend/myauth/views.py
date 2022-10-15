from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import logout
from .models import User
from .serializers import UserLoginSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class UserRegistrationView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            "success": "True",
            "status code": status_code,
            "message": "User registered successfully",
        }
        return Response(response, status=status_code)

@api_view(["GET"])
def insert_test_user(request):
    new_user = User(username="test", password="test", email="test@test.com")
    new_user.save()
    return Response("Created ya boi Test")

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        print(request.headers)
        content = {"user": str(request.user)}
        return Response(content)

class UserLoginView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        status_code = status.HTTP_200_OK
        response = {
            "success": True,
            "status code": status_code,
            "message": "Logged in successfully",
            "token": serializer.data["token"],
        }
        return Response(response, status=status_code)
    
class UserLogoutView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserLoginSerializer
    
    def post(self, request):
        Token.objects.get(user=request.user).delete()
        logout(request)
        return Response("Successfully logged out")

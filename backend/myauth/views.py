from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserLoginSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

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

# @api_view(["GET"])
# def my_login(request):
#     # email = request.POST["email"]
#     # password = request.POST["password"]
#     email = "test@email.com"
#     password = "test"
#     user = authenticate(request, email=email, password=password)
#     if user is not None:
#         login(request, user)
#         return Response("User logged in")
#     else:
#         return HttpResponseForbidden()

# @api_view(["POST"])
# def my_logout(request):
#     if request.user.is_authenticated:
#         logout(request)
#         return Response("User logged out")
#     else:
#         return HttpResponseBadRequest()

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
            "success": "True",
            "status code": status_code,
            "message": "Logged in",
            "token": serializer.data["token"],
        }
        return Response(response, status=status_code)

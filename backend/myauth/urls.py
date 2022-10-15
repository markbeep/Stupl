from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.UserRegistrationView.as_view()),
    path("login/", views.UserLoginView.as_view()),
    path("test/", views.insert_test_user),
    path("get/", views.UserViewSet.as_view({"get": "list"})),
    path("required/", views.HelloView.as_view()),
    path("logout/", views.UserLogoutView.as_view()),
]

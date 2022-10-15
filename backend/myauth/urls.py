from django.urls import include, path
from . import views

urlpatterns = [
    # path("", include("dj_rest_auth.urls")),
    path("register/", views.UserRegistrationView.as_view()),
    path("login/", views.UserLoginView.as_view()),
    path("test/", views.insert_test_user),
    path("get/", views.UserViewSet.as_view({"get": "list"})),
    path("required/", views.logged_in),
]
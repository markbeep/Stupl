from django.urls import include, path
from . import views

urlpatterns = [
    # path("", include("dj_rest_auth.urls")),
    path("login/", views.my_login),
    path("test/", views.insert_test_user),
    path("success/", views.logged_in),
    path("get/", views.UserViewSet.as_view({"get": "list"}))
]

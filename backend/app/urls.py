from django.urls import path
from . import views

urlpatterns = [
    path("hello/", views.list_temporary),        
]

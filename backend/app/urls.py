from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_temporary),
    path("<int:pk>/", views.get_page),        
    path("test/", views.load_main_info),        
]

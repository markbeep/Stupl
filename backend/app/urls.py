from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_temporary),
    path("test/", views.load_main_info), 
    path("main/", views.load_main_info),
    path("add/",views.add_subject),
    path("delete/",views.del_subject),
    path("hello/", views.list_temporary),       
]

from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_temporary),
    path("add/",views.add_subject),
    path("vvz/",views.load_vvz),
    path("delete/",views.delete_subject),
    path("hello/", views.list_temporary),       
    path("fill_db/", views.fill_db),    
    path("get/", views.get_subjects_per_user)   
]

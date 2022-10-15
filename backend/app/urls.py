from django.urls import path
from . import views

urlpatterns = [
    path("list_subjects/", views.list_temporary),
    path("add_subject/",views.add_subject),
    path("load_vvz/",views.load_vvz),
    path("delete_subject/",views.delete_subject),
    path("hello/", views.list_temporary),       
    path("fill_db/", views.fill_db),    
    path("get_subjects/", views.get_subjects_per_user),
    path("get_statistics/", views.get_statistics)
]

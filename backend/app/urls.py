from django.urls import path
from . import views

urlpatterns = [
    path("add_subject/", views.add_subject),
    path("load_vvz/", views.load_vvz),
    path("delete_subject/", views.delete_subject),
    path("edit_subject/", views.edit_subject),
    path("get_subjects/", views.get_subjects_per_user),
    path("get_statistics/", views.get_statistics),
    path("get_requirements/", views.get_requirements)
]

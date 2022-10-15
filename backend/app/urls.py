from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_temporary),
    path("main/", views.load_user_sub),
    path("add/",views.add_subject),
    path("vvz/",views.load_vvz),
    path("delete/",views.del_subject),
    path("hello/", views.list_temporary),       
    path("fill_db/", views.fill_db),       
]

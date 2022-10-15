from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_temporary),
    path("<int:pk>/", views.get_page),        
    path("main/", views.load_main_info),
    path("add/",views.add_subject),
    path("delete/",views.del_subject)
]

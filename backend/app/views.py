from unicodedata import category
from django.shortcuts import render
from django.http import JsonResponse

from .models import VVZSubjects, UserSubjects

# Create your views here.

def list_temporary(request):
    subjects = VVZSubjects.objects.all()
    return JsonResponse({
        "data": len(subjects)
    })

def get_page(request, pk: int):
    return {
        "pk": pk
    }


def load_main_info(request):
    # From UserSubjects return list with all information for certain user
    username = request.POST["username"]
    subs = UserSubjects.objects.all().filter(user=username)
    return subs

def add_subject(request):
    # Add subject to UserSubjects
    user = UserSubjects.objects.create()
    user.name = request.POST["name"]
    user.credits = request.Post["credits"]
    user.category = request.Post["category"]
    user.semester = request.Post["semester"]
    user.grade = request.Post["grade"]
    user.count_grade = True
    user.count_credits = True
    return

def del_subject(request):
    # Delete subject from UserSubjects
    subjid = request.POST["subjid"]
    UserSubjects.objects.filter(id=subjid).delete()
    return Response("Success")
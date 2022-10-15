from unicodedata import category
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import VVZSubjects, UserSubjects

# Create your views here.

def list_temporary(request):
    subjects = VVZSubjects.objects.all()
    return JsonResponse({
        "data": len(subjects)
    })

@api_view(["POST","GET"])
def load_main_info(request):
    # From UserSubjects return list with all information for certain user
    user = request.user
    #subs = UserSubjects.objects.all().filter(user=user)
    return JsonResponse({"name": "Linear Algebra", "credits": "7\u00a0credits", "id": 163637, "sem": False, "category": "First Year Examinations"})

@api_view(["POST"])
def add_subject(request):
    # Add subject to UserSubjects
    #user = UserSubjects.objects.create()
    #user.name = request.POST["name"]
    #user.credits = request.POST["credits"]
    #user.category = request.POST["category"]
    #user.semester = request.POST["semester"]
    #user.grade = request.POST["grade"]
    #user.count_grade = True
    #user.count_credits = True
    return JsonResponse(request)

def del_subject(request):
    # Delete subject from UserSubjects
    subjid = request.POST["subjid"]
    UserSubjects.objects.filter(id=subjid).delete()
    return Response("Success")

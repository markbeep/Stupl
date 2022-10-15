
from curses.ascii import US
from operator import countOf
from unicodedata import category
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import VVZSubjects, UserSubjects

# Create your views here.

def list_temporary(request):
    sub = VVZSubjects.objects.create(name="Test",credits=7,vvz_id=1,lesson_number="d",semester=1,year=1)
    sub.save()
    subjects = VVZSubjects.objects.all()
    sub2 = UserSubjects.objects.all()
    return JsonResponse({
        "data": len(subjects),
        "data2": len(sub2)
    })

@api_view(["POST","GET"])
def load_main_info(request):
    # From UserSubjects return list with all information for certain user
    user = request.user
    #subs = UserSubjects.objects.all().filter(user=user)
    return JsonResponse({"name": "Linear Algebra", "credits": "7\u00a0credits", "id": 163637, "sem": False, "category": "First Year Examinations"})

@api_view(["POST"])
def add_subject(request):
    name = "Hello"
    credits = 7
    vvz_subject = None
    lesson_number = "Hello"
    category = "c"
    semester = 1
    grade = 5
    count_grade = True
    count_credits = True
    year = 1
    sub = UserSubjects.objects.create(name=name,credits=credits,vvz_subject=vvz_subject,grade=grade,semester=semester,year=year,user=None,count_grade=count_grade,count_credits=count_credits)
    sub.save()
    # Add subject to UserSubjects
    #user = UserSubjects.objects.create()
    #user.name = 
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

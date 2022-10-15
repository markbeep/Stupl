
import django
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json
from .models import VVZSubjects, UserSubjects
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(["GET"])
def list_temporary(request):
    subjects = VVZSubjects.objects.all()
    sub2 = UserSubjects.objects.all()
    return Response({
        "data": len(subjects),
        "data2": len(sub2)
    })
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_subjects_per_user(request):
    user = request.user
    subjects = user.subjects.all()
    return Response([
        {
            "id": x.id,
            "name": x.name,
            "credits": x.credits,
            "category": x.category,
            "semester": x.semester,
            "grade": x.grade
        }
        for x in subjects
    ])

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def load_vvz(request, keyword):
    vvz = VVZSubjects.objects.filter(name__icontains=keyword).all()
    return Response([
        {
            "name": x.name,
            "credits": x.credits
        }
        for x in vvz
    ])

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_subject(request):
    name = request.data.get("name", None)
    credits = request.data.get("credits", None)
    vvz_subject = None #request.POST["vvz_subject"]
    category = request.data.get("category", None)
    semester = request.data.get("semester", None)
    grade = request.data.get("grade", None)
    user = request.user
    count_grade = True
    count_credits = True
    year = 2022
    sub = UserSubjects.objects.create(
        name=name,
        user=user,
        credits=credits,
        category=category,
        vvz_subject=vvz_subject,
        grade=grade,
        semester=semester,
        year=year,
        count_grade=count_grade,
        count_credits=count_credits
    )
    sub.save()
    return Response("Success")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delete_subject(request):
    # Delete subject from UserSubjects
    subjid = request.GET.get("subject_id")
    subject = get_object_or_404(UserSubjects, id=subjid)
    subject.delete()
    return Response("Success")

def sumCreditsCategories(user, categoryList):
    sum = 0
    for cat in categoryList:
        credits = 0
        for sub in UserSubjects.objects.filter(user=user, category=cat):
            credits = credits + sub.credits
        sum = sum + credits
    return sum

@api_view(["GET"])
def requirements(request):
    user = request.user
    return Response({
        {
            "1": sumCreditsCategories(user, []) >= 100,
            "2": True,
            "3": True,
            "4": True,
            "5": True,
            "6": True,
            "7": True,
            "8": True,
            "9": True,
        }
    })

@api_view(["GET"])
def fill_db(request):
    print("HELLO")
    with open("data/lectures.json",'r') as f:
        data = json.load(f)

    for i, x in enumerate(data):
        try:
            lec = VVZSubjects.objects.create()
            lec.name = x["name"]
            lec.credits = x["credits"]
            lec.vvz_id = x["vvz_id"]
            lec.semester = x["semester"]
            lec.year = x["year"]
            lec.save()
        except django.db.utils.IntegrityError:
            print(f"Error {i = } | {x = }")
    return Response("Done")

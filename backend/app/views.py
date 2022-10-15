
from unicodedata import category
import django
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json

from backend.app.categories import category_to_enum, enum_to_category_german
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
            "category_id": x.category,
            "category": enum_to_category_german(x.category),
            "semester": x.semester,
            "year": x.year,
            "grade": x.grade,
            "planned": x.planned,
            
        }
        for x in subjects
    ])

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def load_vvz(request):
    category = request.GET.get("category", None)
    if category:
        vvz = VVZSubjects.objects.filter(category=category).all()
    else:
        vvz = VVZSubjects.objects.all()
    return Response([
        {
            "id": x.id,
            "name": x.name,
            "vvz_id": x.vvz_id,
            "lesson_number": x.lesson_number,
            "credits": x.credits,
            "category_id": x.category,
            "category": enum_to_category_german(x.category),
            "semester": x.semester,
            "year": x.year,
        }
        for x in vvz
    ])

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_subject(request):
    name = request.data.get("name", None)
    credits = request.data.get("credits", None)
    category = request.data.get("category", None)
    semester = request.data.get("semester", None)
    year = request.data.get("year", None)
    grade = request.data.get("grade", None)
    planned = request.data.get("planned", None)
    if None in [name, credits, category, semester, year, grade, planned]:
        return Response("Post field missing", status=status.HTTP_400_BAD_REQUEST)
    user = request.user
    sub = UserSubjects.objects.create(
        name=name,
        user=user,
        credits=credits,
        category=category,
        grade=grade,
        semester=semester,
        year=year,
        planned=planned,
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
            lec = VVZSubjects.objects.create(
                name=x["name"],
                credits=x["credits"],
                vvz_id=x["vvz_id"],
                semester=x["semester"],
                year=x["year"],
                category=category_to_enum(x["category"]).value,
            )
            lec.save()
        except django.db.utils.IntegrityError as e:
            print(f"Error {e} | {x = }")
    return Response("Done")

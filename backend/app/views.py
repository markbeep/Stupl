
from unicodedata import category
import django
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json

from app.categories import category_to_enum, enum_to_category_german
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
def sumCreditsCategories(user, categoryList, maxList):
    sum = 0
    i = 0
    for cat in categoryList:
        credits = 0
        for sub in UserSubjects.objects.filter(user=user, category=cat):
            credits = credits + sub.credits
        if credits > maxList[i]:
            sum += maxList[i]
        else:
            sum = sum + credits
        i = i+1
    return sum

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_subjects_per_user(request):
    user = request.user
    subjects = user.subjects.all()
    return Response({
        "subjects": [
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
        } for x in subjects], 
        "requirements": {
            "1": sumCreditsCategories(user, [4],[180]) == 56,
            "2": sumCreditsCategories(user, [1,3],[180,180]) >= 84,
            "3": sumCreditsCategories(user, [1],[180]) >= 45,
            "4": sumCreditsCategories(user, [3],[180]) >= 32,
            "6": sumCreditsCategories(user, [1,3,6],[180,180,180]) >= 96,
            "7": sumCreditsCategories(user, [5],[180]) >= 2,
            "8": sumCreditsCategories(user, [2], [180]) >= 5,
            "9": sumCreditsCategories(user, [8], [180]) >= 6,
            "10": sumCreditsCategories(user, [7],[180]) >= 10,
            "11": sumCreditsCategories(user, [0,1,2,3,4,5,6,7,8],[180,180,10,180,180,2,180,10,6]) >= 180,
        }

    })

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

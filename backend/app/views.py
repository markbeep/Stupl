
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import VVZSubjects, UserSubjects

# Create your views here.

def list_temporary(request):
    subjects = VVZSubjects.objects.all()
    sub2 = UserSubjects.objects.all()
    return Response({
        "data": len(subjects),
        "data2": len(sub2)
    })

@api_view(["POST","GET"])
def load_user_sub(request):
    # From UserSubjects return list with all information for certain user
    usersub = UserSubjects.objects.all().filter(user=request.user)
    return Response(usersub)

def load_vvz(request):
    vvz = VVZSubjects.objects.al()
    return Response(vvz)

@api_view(["POST"])
def add_subject(request):
    name = request.POST["name"]
    credits = request.POST["credits"]
    vvz_subject = request.POST["vvz_subject"]
    category = request.POST["category"]
    semester = request.POST["semester"]
    grade = request.POST["grade"]
    count_grade = True
    count_credits = True
    year = 2022
    sub = UserSubjects.objects.create(name=name,credits=credits,category=category,vvz_subject=vvz_subject,grade=grade,semester=semester,year=year,user=None,count_grade=count_grade,count_credits=count_credits)
    sub.save()
    return Response("Success")

def del_subject(request):
    # Delete subject from UserSubjects
    subjid = request.POST["subjid"]
    UserSubjects.objects.filter(id=subjid, user=request.user).delete()
    return Response("Success")


def subject_table_row_data(request):
    user = request.user
    subjects = user.subjects.all()

def fill_db(request):
    with open("data/lectures.json",'r') as f:
        data = json.load(f)

    for i in range(len(data)):
        lec = VVZSubjects.objects.create()
        lec.name = data[i]["name"]
        lec.credits = data[i]["credits"]
        lec.vvz_id = data[i]["vvz_id"]
        #lec.lesson_number = data[i]["id"]
        lec.semester = data[i]["semester"]
        lec.year = data[i]["year"]
        lec.save()
    return Response("Done")

from mimetypes import init
from app.models import VVZSubjects
import json

def init_db():
    with open("lectures.json",'r') as read_file:
        data = json.load()

    for i in range(len(data)):
        lec = VVZSubjects.objects.create()
        lec.name = data[i]["name"]
        lec.credits = int(data[i]["credits"][0]) # Fix this, this is very bad!! 
        lec.vvz_id = data[i]["id"]
        lec.lesson_number = data[i]["id"]
        lec.semester = data[i]["sem"]
        lec.year = 2022
        lec.save()

if __name__ == "__main__":
    init_db()
from django.shortcuts import render
from django.http import JsonResponse

from .models import VVZSubjects

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

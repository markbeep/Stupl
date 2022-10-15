from django.db import models
from myauth.models import User


class VVZSubjects(models.Model):
    name = models.CharField(max_length=256)
    credits = models.IntegerField()
    vvz_id = models.IntegerField()
    lesson_number = models.CharField(max_length=256)
    semester = models.CharField(max_length=1)
    year = models.IntegerField()
    category = models.IntegerField()

    class Meta:
        app_label = "app"

    def __str__(self) -> str:
        return self.name


class UserSubjects(models.Model):
    name = models.CharField(max_length=256)
    credits = models.IntegerField()
    category = models.IntegerField()
    semester = models.CharField(max_length=1)
    year = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="subjects")
    grade = models.FloatField()
    planned = models.BooleanField()

    class Meta:
        app_label = "app"

    def __str__(self) -> str:
        return self.name

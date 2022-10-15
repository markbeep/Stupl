from django.db import models
from myauth.models import User


class VVZSubjects(models.Model):
    name = models.CharField(max_length=256)
    credits = models.IntegerField()
    vvz_id = models.IntegerField()
    lesson_number = models.CharField(max_length=256)
    semester = models.BooleanField()  # FALSE = HS, TRUE = FS
    year = models.IntegerField()

    class Meta:
        app_label = "app"

    def __str__(self) -> str:
        return self.name


class UserSubjects(models.Model):
    name = models.CharField(max_length=256)
    credits = models.IntegerField()
    category = models.CharField(max_length=256)  # Change to int (1-8)
    semester = models.BooleanField()             # Change to Char
    year = models.IntegerField()
    vvz_subject = models.ForeignKey(VVZSubjects, on_delete=models.CASCADE, related_name="user_subjects",null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subjects")
    grade = models.FloatField()
    count_grade = models.BooleanField()
    count_credits = models.BooleanField()

    class Meta:
        app_label = "app"

    def __str__(self) -> str:
        return self.name

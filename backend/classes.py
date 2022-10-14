from peewee import *


class User(Model):
    ...


class VVZSubjects(Model):
    name = CharField()
    credits = IntegerField()
    vvz_id = IntegerField()
    lesson_number = CharField()
    semester = BooleanField()  # FALSE = HS, TRUE = FS
    year = IntegerField()


class UserSubjects(Model):
    name = CharField()
    credits = IntegerField()
    category = CharField()
    semester = BooleanField()
    year = IntegerField()
    vvz_subject = ForeignKeyField(VVZSubjects, backref='user_subjects')
    user = ForeignKeyField(User, backref="subjects")
    grade = DoubleField()
    count_grade = BooleanField()
    count_credits = BooleanField()

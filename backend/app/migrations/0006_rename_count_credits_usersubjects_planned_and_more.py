# Generated by Django 4.0.5 on 2022-10-15 19:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_vvzsubjects_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersubjects',
            old_name='count_credits',
            new_name='planned',
        ),
        migrations.RemoveField(
            model_name='usersubjects',
            name='count_grade',
        ),
        migrations.RemoveField(
            model_name='usersubjects',
            name='vvz_subject',
        ),
    ]

# Generated by Django 4.1.2 on 2022-10-15 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_usersubjects_vvz_subject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersubjects',
            name='vvz_subject',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_subjects', to='app.vvzsubjects'),
        ),
    ]
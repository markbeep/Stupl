from django.contrib.auth.models import User

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]
        extra_kwargs =  {"password": {"write_only": True, "required": True}}
    
    def create(self, validate_data):
        user = User.objects.create(**validate_data)
        return user

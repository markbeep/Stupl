from .models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]
        extra_kwargs =  {"password": {"write_only": True, "required": True}}
    
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=256)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=256, read_only=True)
    
    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        print(f"{email = } | {password = }")
        user = authenticate(email=email, password=password)
        print(f"{user = }")
        if user is None:
            raise serializers.ValidationError("Invalid login")
        try:
            token = Token.objects.get(user=user)
        except User.DoesNotExist:
            raise serializers.ValidationError("User doesn't exist")
        except Token.DoesNotExist:
            token = Token.objects.create(user=user)            
        update_last_login(None, user)
        return {
            "email": user.email,
            "token": token.key,
        }

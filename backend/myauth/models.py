from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Users must have an email")
    
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    
    
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=256,
        unique=True
    )
    USERNAME_FIELD = "email"
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    def __str__(self) -> str:
        return self.email

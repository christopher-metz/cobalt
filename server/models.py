from __future__ import unicode_literals

from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    hashed_password = models.CharField(max_length=200)

class Photo(models.Model):
    user = models.ForeignKey('User', related_name='user', on_delete=models.CASCADE)
    photo_url = models.CharField(max_length=200)

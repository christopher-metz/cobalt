from __future__ import unicode_literals

from django.db import models

class Users(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    hashed_password = models.TextField()

class Photos(models.Model):
    user_id = models.IntegerField()
    photo_url = models.TextField()

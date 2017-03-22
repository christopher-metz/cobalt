from __future__ import unicode_literals

from django.db import models

# class User(models.Model):
#     first_name = models.CharField(max_length=200)
#     last_name = models.CharField(max_length=200)
#     email = models.CharField(max_length=100)
#     password = models.CharField(max_length=200)

class Photo(models.Model):
    user = models.ForeignKey('auth.User', related_name='photos', on_delete=models.CASCADE)
    photo_url = models.CharField(max_length=200)

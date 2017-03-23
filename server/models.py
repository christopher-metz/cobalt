from __future__ import unicode_literals

from django.db import models

class Photo(models.Model):
    user = models.ForeignKey('auth.User', related_name='photos', on_delete=models.CASCADE)
    photo_url = models.CharField(max_length=200)

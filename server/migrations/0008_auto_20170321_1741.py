# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-21 17:41
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_user_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='hashed_password',
            new_name='password',
        ),
    ]

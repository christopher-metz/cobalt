# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-20 18:24
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Photos',
            new_name='Photo',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]

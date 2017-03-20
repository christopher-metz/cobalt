# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-20 18:49
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20170320_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
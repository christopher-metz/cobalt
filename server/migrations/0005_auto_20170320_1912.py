# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-20 19:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_auto_20170320_1849'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='server.User'),
        ),
    ]

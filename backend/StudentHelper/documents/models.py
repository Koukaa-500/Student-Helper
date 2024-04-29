# models.py
from django.db import models

class Data(models.Model):
    name = models.CharField(max_length=100, default='default_value')
    sector = models.CharField(max_length=100)
    year = models.IntegerField()
    field = models.CharField(max_length=100)

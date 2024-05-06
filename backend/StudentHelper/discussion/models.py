from django.db import models
from django.conf import settings

class Discussion(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Conversation(models.Model):
    id = models.AutoField(primary_key=True)
    messages = models.ManyToManyField('Discussion')

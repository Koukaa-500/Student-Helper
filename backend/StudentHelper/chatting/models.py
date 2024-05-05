from django.db import models
from datetime import datetime

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=1000)
    messages = models.TextField(blank=True, null=True)
class Message(models.Model):
    room = models.ForeignKey(Room, related_name='room_messages', on_delete=models.CASCADE)
    value = models.CharField(max_length=1000000)
    date = models.DateTimeField(default=datetime.now, blank=True)
    user = models.CharField(max_length=1000000)
    
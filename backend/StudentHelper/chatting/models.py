from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=1000)
    # Related name should be plural since it's a one-to-many relationship
    # messages will store a list of messages associated with the room
    # If you want to store messages as JSON, you can use JSONField instead of TextField
    messages = models.TextField(blank=True, null=True)

class Message(models.Model):
    # ForeignKey to Room to establish a relationship
    room = models.ForeignKey(Room, related_name='room_messages', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    user = models.EmailField()
    value = models.CharField(max_length=1000000)  # Storing message value

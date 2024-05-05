from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from rest_framework import status
@api_view(['GET'])
def get_messages(request, room):
    try:
        message = Message.objects.get(id=room)
        messages = Message.objects.filter(room=message.room)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    except Message.DoesNotExist:
        return Response(status=404)

@api_view(['POST'])
def send_message(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)





@api_view(['POST'])
def create_room(request):
    if request.method == 'POST':
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
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


from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def chatbot_endpoint(request):
    if request.method == 'POST':
        # Get the user's message from the request data
        user_message = request.data.get('message', '')

        # Here you can implement the logic to process the user's message and generate a response from the chatbot
        # For demonstration, let's just echo the user's message
        bot_response = f"Echoing: {"hey"}"

        # Return the bot's response in JSON format
        return Response({'response': bot_response})





@api_view(['POST'])
def create_room(request):
    if request.method == 'POST':
        room_name = request.data.get('name', '')
        
        if room_name:
            room = Room.objects.create(name=room_name)
            
            # Fetch all messages associated with this room
            messages = Message.objects.filter(room=room)
            
            # Concatenate the values of the 'value' field of all messages
            messages_values = [message.value for message in messages]
            messages_str = '\n'.join(messages_values)
            
            # Save the concatenated messages to the 'messages' field of the room
            room.messages = messages_str
            room.save()
            
            return JsonResponse({'id': room.id}, status=201)
        else:
            return JsonResponse({'error': 'Room name is required'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

@api_view(['POST'])
def save_room_conversation(request, room_id):
    try:
        room = Room.objects.get(id=room_id),
        name = request.objects.get(name = room)
        messages = request.data.get('messages', '')
        if messages:
            room.messages = messages
            room.name = name
            room.save()
            return Response({'message': 'Conversation details saved successfully'}, status=200)
        else:
            return Response({'error': 'No conversation details provided'}, status=400)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=404)
    
@api_view(['GET'])
def get_room_conversation(request, room_id):
    try:
        room = Room.objects.get(id=room_id)
        messages = room.messages
        return Response({'messages': messages}, status=200)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=404)

@api_view(['GET'])
def get_rooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


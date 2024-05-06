from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Discussion, Conversation 
from .serializers import DiscussionSerializer, ConversationSerializer

@api_view(['GET'])
@login_required
def get_message(request, discussion_id):
    try:
        discussion = request.get(id=discussion_id)
        serializer = DiscussionSerializer(discussion)
        return JsonResponse(serializer.data)
    except Discussion.DoesNotExist:
        return JsonResponse({'error': 'Discussion not found'}, status=404)

@api_view(['POST'])
@login_required
def save_message(request):
    data = request.data
    text = data.get('text')

    try:
        user = request.user
        discussion = Discussion.objects.create(text=text, user=user)
        serializer = DiscussionSerializer(discussion)

        save_conversation(request)

        return JsonResponse(serializer.data, status=201)
    except Exception as e:
        return HttpResponseBadRequest(f'Failed to save message: {str(e)}')

@api_view(['POST'])
def save_conversation(request):
    data = request.data.get('messages')
    try:
        messages = [Discussion.objects.get(id=id) for id in data]
        conversation = Conversation.objects.create()
        conversation.messages.add(*messages)
        serializer = ConversationSerializer(conversation)
        return JsonResponse(serializer.data)
    except Discussion.DoesNotExist:
        return HttpResponseBadRequest('One or more messages do not exist')

@api_view(['GET'])
def get_conversation(request, conversation_id):
    try:
        conversation = Conversation.objects.get(id=conversation_id)
        serializer = ConversationSerializer(conversation)
        return JsonResponse(serializer.data)
    except Conversation.DoesNotExist:
        return JsonResponse({'error': 'Conversation not found'}, status=404)

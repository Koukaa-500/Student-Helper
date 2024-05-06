from rest_framework import serializers
from .models import Discussion, Conversation

class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ['idDiscussion', 'timestamp', 'text', 'idUser']

class ConversationSerializer(serializers.ModelSerializer):
    messages = DiscussionSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['idConversation', 'messages']

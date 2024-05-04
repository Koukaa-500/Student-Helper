from django.urls import path
from .views import get_message, save_message, save_conversation, get_conversation

urlpatterns = [
    path('getMessage/<int:discussion_id>/', get_message),
    path('sendMessage/', save_message),
    path('saveConversation/', save_conversation),
    path('getConversation/<int:conversation_id>/', get_conversation),
]
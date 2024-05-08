# chat/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('getMessages/message/<int:room>/', views.get_messages, name='get_messages'),
    path('sendMessage/', views.send_message, name='send_message'),
    path('createRoom/', views.create_room, name='create_room'),
    path('saveRoomConversation/<int:room_id>/', views.save_room_conversation , name='save_conversation'),
    path('chatting/getRoomConversation/<int:room_id>/', views.get_room_conversation),
    path('chatting/getRooms/', views.get_rooms, name='get_rooms'),
    path('chatbot_endpoint/',views.chatbot_endpoint, name='chatbot_endpoint')
]

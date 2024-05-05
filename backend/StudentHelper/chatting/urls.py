# chat/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('getMessages/message/<int:room>/', views.get_messages, name='get_messages'),
    path('sendMessage/', views.send_message, name='send_message'),
]

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from rest_framework import status
import argparse
from dataclasses import dataclass
from langchain_chroma import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_openai import OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

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
import subprocess
import os

@api_view(['POST'])
def chatbot_endpoint(request):
    if request.method == 'POST':
        
        query_text = request.data.get('message', '')

        CHROMA_PATH = "chroma"
        PROMPT_TEMPLATE = """
        You Are Student Helper ChatBot (ENSIT edition),
        Answer the question based on the following context if it has any relevant information to answer the question. 
        Otherwise, answer the question based on your knowledge without making it obvious that you didn't:

        {context}

        ---

        Answer the question based on the above context, Answer in the same language in the question: {question}
        """
        embedding_function = OpenAIEmbeddings()
        db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
        
        results = db.similarity_search_with_relevance_scores(query_text, k=3)
        context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
        
        
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = prompt_template.format(context=context_text, question=query_text)
        sources = [doc.metadata.get("source", None) for doc, _score in results]
        sources = list(set(sources))
        # print(sources)
        chat =ChatOpenAI(model="gpt-3.5-turbo",temperature=0.4)
        response_text = chat.invoke(prompt).content 
        # response_text += f"\nSources: {', '.join(sources)}"
        

        

        
        # Print the text from the output.txt file
        # print(output_text)
        
        # print(bot_response)

        # Return the bot's response in JSON format
        return Response({'response': response_text})





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


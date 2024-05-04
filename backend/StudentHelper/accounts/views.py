from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser,Chat,Conversation
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer , ChatSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.base import ContentFile
from django.contrib.auth.hashers import make_password

# Create your views here.

from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
                        status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)

    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)

    return Response({'token': token.key, 'user': serializer.data})





@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        # Extract user data from request
        email = request.data['email']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        sector = request.data['sector']
        password = request.data['password']
        year = request.data['year']
        
        # Check if a user with the given email already exists
        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if '@ensit.u-tunis.tn' not in email:
            return Response({"error":"Please type a valid ensit email"})
        # Create the user
        user = CustomUser.objects.create(email=email, first_name=first_name,last_name=last_name,sector=sector,year=year)
        
        # Set the password
        user.set_password(password)
        
        # Save the user
        user.save()
        
        # Create a token for the user
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({"token": token.key, "user": serializer.data})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("Accepted {}".format(request.user.email))




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Retrieve the refresh token from the request data
        refresh_token = request.data.get('refresh')
        
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Blacklist the refresh token to invalidate it
        RefreshToken(refresh_token).blacklist()
        
        return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_data_view(request):
    user = request.user

    # Create a default response
    response_data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'year': user.year,
        'sector': user.sector,
        'profile_image': None  # Default value for profile_image
    }

    # Check if profile image exists
    if user.profile_image:
        response_data['profile_image'] = user.profile_image.url

    return Response(response_data, status=status.HTTP_200_OK)




@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_profile_image(request):
    user = request.user

    # Check if image data is in request
    if 'profile_image' not in request.data:
        return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)

    profile_image_data = request.data['profile_image']

    # Create a ContentFile object from the image data
    image_name = f"{user.email}_profile_image.jpg"  # You can change the extension based on the image type
    user.profile_image.save(image_name, ContentFile(profile_image_data), save=True)

    return Response({'message': 'Profile image updated successfully'}, status=status.HTTP_200_OK)



from django.http import HttpResponse, HttpResponseNotFound, FileResponse, JsonResponse
from django.conf import settings
import os

def get_profile_image(request, filename):
    # Define the path to the media directory
    media_root = settings.MEDIA_ROOT
    
    # Construct the full path to the image
    image_path = os.path.join(media_root, 'profile_images', filename)
    
    # Check if the file exists
    if os.path.exists(image_path):
        # Serve the image using FileResponse
        return FileResponse(open(image_path, 'rb'), content_type='image/jpeg')
    else:
        # Return a 404 response if the file does not exist
        return HttpResponseNotFound("Image not found")

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user

    # Exclude profile_image field from the request data
    request_data = request.data.copy()
    request_data.pop('profile_image', None)

    # Hash the password if it's included in the request data
    if 'password' in request_data:
        request_data['password'] = make_password(request_data['password'])

    # Validate and update user data
    serializer = UserSerializer(user, data=request_data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#########################################Chatbot#############################


from rest_framework.authtoken.models import Token

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def sendMessage(request):
    content = request.data.get('content', '')  # Get the content from request data
    conversation_id = request.data.get('conversation_id', '')  # Get the conversation_id from request data
    
    # Retrieve the user ID from the authenticated user
    user_id = request.user.id
    
    # Create a new message with the extracted user ID
    new_message = Chat.objects.create(content=content, user_id=user_id, conversation_id=conversation_id)
    
    return Response({"message": "Message sent successfully"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getMessage(request, conversation_id):
    conversation_messages = Chat.objects.filter(conversation_id=conversation_id)
    serializer = ChatSerializer(conversation_messages, many=True)
    return JsonResponse({'conversation_details': serializer.data})
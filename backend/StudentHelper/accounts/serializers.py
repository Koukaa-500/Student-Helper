from pydoc import isdata
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id' , 'email','password','first_name', 'last_name', 'sector','year','profile_image']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'], 
            sector=validated_data['sector'],
            year=validated_data['year'],
            profile_image = validated_data.objects.create(image=isdata['profile_image/']),
            
        )
        return user

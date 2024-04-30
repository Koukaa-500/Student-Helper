# serializers.py
from rest_framework import serializers
from .models import Data

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['dataId', 'name','sector', 'year', 'field']

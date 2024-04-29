# urls.py
from django.urls import path
from .views import search_data

urlpatterns = [
    path('search/', search_data, name='search_data'),
]

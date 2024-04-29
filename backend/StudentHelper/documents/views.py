# views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import Data

def search_data(request):
    if request.method == 'GET':
        year = request.GET.get('year', None)
        sector = request.GET.get('sector', None)
        field = request.GET.get('field', None)

        data_queryset = Data.objects.all()

        if year:
            data_queryset = data_queryset.filter(year=year)
        if sector:
            data_queryset = data_queryset.filter(sector=sector)
        if field:
            data_queryset = data_queryset.filter(field=field)

        data_list = list(data_queryset.values())

        return JsonResponse(data_list, safe=False)
    else:
        return JsonResponse({"error": "Only GET method is supported."}, status=400)
    


def get_data(request):
    if request.method == 'GET':
        # Query your Data model to get the desired data
        data = Data.objects.all().values()
        # Convert queryset to a list of dictionaries
        data_list = list(data)
        # Return data as JSON response
        return JsonResponse(data_list, safe=False)
    else:
        # Return error response for unsupported HTTP methods
        return JsonResponse({'error': 'Only GET method is supported.'}, status=400)

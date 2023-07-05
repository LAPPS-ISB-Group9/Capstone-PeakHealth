from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from .serializers import FeedbackSerializer
import json
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

class FeedbackCreateView(APIView):
    def post(self, request):
        try:
            print(request)
            request_data = json.loads(request.body)
            print(request_data)
            serializer = FeedbackSerializer(data=request_data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)

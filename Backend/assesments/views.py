from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Rating

# Create your views here.

class TestRecordCreateView(APIView):
    def post(self, request):
        serializer = TestRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, user_id):
        try:
            # Retrieve the latest test record for the user ID
            latest_test = TestRecord.objects.filter(user_id=user_id).latest('test_datetime')

            # Get the scores for each section
            section_scores = {
                'user_id': latest_test.user_id,
                'EE': latest_test.ee_score,
                'DP': latest_test.dp_score,
                'PA': latest_test.pa_score
            }

            return Response(section_scores, status=status.HTTP_200_OK)
        except TestRecord.DoesNotExist:
            return Response({'error': 'No test record found for the user'}, status=status.HTTP_404_NOT_FOUND)

class TestRecordListView(generics.ListAPIView):
    serializer_class = TestRecordListSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        queryset = TestRecord.objects.filter(user_id=user_id).order_by('-test_datetime')[:2]
        return queryset



@api_view(['POST'])
def save_rating(request):
    test_id = request.data.get('test_id')
    user_id = request.data.get('user_id')
    video_url = request.data.get('video_url')
    rating = request.data.get('rating')
    
    # Check if the rating record already exists for the given test_id and video_url
    try:
        rating_obj = Rating.objects.get(test_id=test_id, video_url=video_url)
        # If the record exists, update the rating
        rating_obj.rating = rating
        rating_obj.save()
    except Rating.DoesNotExist:
        # If the record doesn't exist, create a new one
        rating_obj = Rating(test_id=test_id, user_id=user_id, video_url=video_url, rating=rating)
        rating_obj.save()
    
    return Response({'message': 'Rating saved successfully.'})

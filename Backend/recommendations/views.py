from django.shortcuts import render
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from .models import TestParagraph, VideoRecommendation
from .serializers import TestParagraphSerializer, VideoRecommendationSerializer
import os
import json
from langchain.llms import OpenAI
from django.conf import settings



class TestParagraphViewSet(viewsets.ModelViewSet):
    queryset = TestParagraph.objects.filter(is_deleted=False, status=1)
    serializer_class = TestParagraphSerializer

    def create(self, request, *args, **kwargs):
        # Load the OpenAI API key from environment variable
        openai_api_key = settings.OPENAI_API_KEY
        
        # Create an instance of the OpenAI language model
        llm = OpenAI(openai_api_key=openai_api_key, temperature=0.75)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract the paragraphs and test record ID from the request data
        para_ee = serializer.validated_data['para_ee']
        para_dp = serializer.validated_data['para_dp']
        para_pa = serializer.validated_data['para_pa']
        test_record_id = serializer.validated_data['test_record']
        
        # Check if a TestParagraph instance with the given test record ID exists
        try:
            test_paragraph = TestParagraph.objects.get(test_record=test_record_id)
            # Return the existing response from the database
            return Response(self.get_serializer(test_paragraph).data, status=status.HTTP_200_OK)
        except TestParagraph.DoesNotExist:
            # Paragraphs not found in the database, proceed with generating new ones
            pass

        para_ee = para_ee + "Create a profile of this person's Emotional exhaustion along with strategy in 100 words."
        para_dp = para_dp + "Create a profile of this person's Depersonalisation along with strategy in 100 words."
        para_pa = para_pa + "Create a profile of this person's Personal Achievement along with strategy in 100 words."

        # Generate new text for each paragraph using OpenAI
        para_ee_new = llm(para_ee)
        para_dp_new = llm(para_dp)
        para_pa_new = llm(para_pa)
        
        # Create a new TestParagraph instance and save the paragraphs
        test_paragraph = TestParagraph.objects.create(
            test_record=test_record_id,
            para_ee=para_ee_new,
            para_dp=para_dp_new,
            para_pa=para_pa_new
        )
        
        return Response(self.get_serializer(test_paragraph).data, status=status.HTTP_201_CREATED)

    

    def handle_exception(self, exc):
        if isinstance(exc, serializers.ValidationError):
            errors = exc.detail
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)
        

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


def get_test_paragraphs(request, test_id):
    try:
        test_paragraph = TestParagraph.objects.get(test_record=test_id)
    except TestParagraph.DoesNotExist:
        return JsonResponse({"error": "Test paragraph not found."}, status=404)

    data = {
        "test_record": test_paragraph.test_record,
        "para_ee": test_paragraph.para_ee,
        "para_dp": test_paragraph.para_dp,
        "para_pa": test_paragraph.para_pa
    }

    return JsonResponse(data)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import TestVideoResult

def get_videos(request, test_id):
    try:
        videos = TestVideoResult.objects.filter(test_id=test_id)
        video_list = []
        for video in videos:
            video_data = {
                'Video_URL': video.video_url,
                'Video_Title': video.video_title
            }
            video_list.append(video_data)

        response = {
            'test_id': test_id,
            'videos': video_list
        }

        return JsonResponse(response)
    except TestVideoResult.DoesNotExist:
        return JsonResponse({'error': 'Test ID does not exist'})

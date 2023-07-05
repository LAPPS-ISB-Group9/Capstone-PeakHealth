from rest_framework import serializers
from .models import TestParagraph, VideoRecommendation

class TestParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestParagraph
        fields = '__all__'


class VideoRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRecommendation
        fields = ('id', 'test_record', 'domain', 'video_name', 'video_desc', 'video_url', 'is_deleted', 'status', 'created_date')
from rest_framework import serializers
from .models import TestRecord, Answer

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['section_id', 'question', 'answer']

class TestRecordSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = TestRecord
        fields = ['user_id', 'test_id', 'test_datetime', 'ee_score', 'dp_score', 'pa_score', 'answers']


    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        test_record = TestRecord.objects.create(**validated_data)
        
        # Create a list of Answer objects
        answers = [Answer(test_record=test_record, **answer_data) for answer_data in answers_data]
        
        # Use bulk_create to create all Answer objects at once
        Answer.objects.bulk_create(answers)
        
        return test_record


class TestRecordGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRecord
        fields = ['user_id', 'test_id', 'test_datetime', 'ee_score', 'dp_score', 'pa_score']

class TestRecordListSerializer(serializers.Serializer):
    current_score = serializers.SerializerMethodField()
    # previous_score = serializers.SerializerMethodField()

    def get_current_score(self, obj):
        if isinstance(obj, TestRecord):
            return TestRecordGetSerializer(obj).data
        return None

    def get_previous_score(self, obj):
        if isinstance(obj, list) and len(obj) > 1:
            return TestRecordGetSerializer(obj[1]).data
        return None
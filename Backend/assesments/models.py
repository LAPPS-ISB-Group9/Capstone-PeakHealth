from django.db import models

# Create your models here.
class TestRecord(models.Model):
    user_id = models.IntegerField()
    test_id = models.CharField(max_length=50)
    test_datetime = models.DateTimeField(auto_now_add=True)
    ee_score = models.IntegerField()
    dp_score = models.IntegerField()
    pa_score = models.IntegerField()

class Answer(models.Model):
    test_record = models.ForeignKey(TestRecord, on_delete=models.CASCADE, related_name='answers')
    section_id = models.IntegerField()
    question = models.IntegerField()
    answer = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    test_id = models.CharField(max_length=50)
    user_id = models.IntegerField()
    video_url = models.URLField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

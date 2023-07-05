from django.db import models
from assesments.models import TestRecord
# Create your models here.

class TestParagraph(models.Model):
    # test_record = models.ForeignKey(TestRecord, on_delete=models.CASCADE)
    test_record = models.CharField(max_length=100)
    para_ee = models.TextField()
    para_dp = models.TextField()
    para_pa = models.TextField()
    is_deleted = models.BooleanField(default=False)
    status = models.IntegerField(default=1)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "test_paragraph"

class VideoRecommendation(models.Model):
    test_record = models.ForeignKey(TestRecord, on_delete=models.CASCADE)
    domain = models.CharField(max_length=255)
    video_name = models.CharField(max_length=255)
    video_desc = models.TextField()
    video_url = models.URLField()
    is_deleted = models.BooleanField(default=False)
    status = models.IntegerField(default=1)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "video_recommendation"

class TestVideoResult(models.Model):
    test_id = models.CharField(max_length=100)
    video_url = models.URLField()
    video_title = models.CharField(max_length=200)
    similarity_score = models.FloatField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.test_id} - {self.video_title}"
    
    class Meta:
        db_table = "test_video_results"



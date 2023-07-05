from django.db import models

# Create your models here.
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

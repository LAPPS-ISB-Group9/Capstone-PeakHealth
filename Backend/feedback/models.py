from django.db import models
from employee.models import User

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test_id = models.CharField(max_length=255)
    rating = models.PositiveIntegerField()
    feedback = models.TextField()
    status = models.CharField(max_length=20)
    created_date = models.DateTimeField(auto_now_add=True)

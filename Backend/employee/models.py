from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class VideoComments(models.Model):

	video_url = models.CharField(max_length = 255, unique=True)
	comments = models.TextField()

	class Meta:
		db_table = "video_comments"



class YoutubeVideosMeta(models.Model):

	search_term = models.CharField(max_length=255)
	video_url = models.CharField(max_length = 255)
	video_title = models.CharField(max_length=255)
	channel_name = models.CharField(max_length=255)
	total_subscribers = models.CharField(max_length=25)
	total_views = models.IntegerField()
	total_likes = models.IntegerField()
	total_dislikes = models.IntegerField()
	total_comments = models.IntegerField()
	video_desc = models.TextField()
	total_times_User_added_to_favorites = models.IntegerField()
	video_length = models.DurationField()
	video_category = models.CharField(max_length=255)
	video_tag = models.CharField(max_length=2000)
	age_restrictions = models.CharField(max_length=15)
	license = models.CharField(max_length=50)
	captions_available = models.CharField(max_length=15)
	search_term_video_url = models.CharField(max_length=255, unique=True)

	class Meta:
		db_table = "youtube_videos_meta"


class YoutubeVIdeosMetaData(models.Model):
    search_term = models.CharField(max_length=255)
    video_url = models.CharField(max_length=255)
    video_title = models.CharField(max_length=255)
    channel_name = models.CharField(max_length=255)
    total_subscribers = models.CharField(max_length=25)
    total_views = models.IntegerField()
    total_likes = models.IntegerField()
    total_dislikes = models.IntegerField()
    total_comments = models.IntegerField()
    video_desc = models.TextField()
    total_times_User_added_to_favorites = models.IntegerField()
    video_length = models.DurationField()
    video_category = models.CharField(max_length=255)
    video_tag = models.CharField(max_length=2000)
    age_restrictions = models.CharField(max_length=15)
    license = models.CharField(max_length=50)
    captions_available = models.CharField(max_length=15)
    search_term_video_url = models.CharField(max_length=255, unique=True)
    domain = models.CharField(max_length=255)
    is_status = models.BooleanField(default=False)
    is_flag = models.BooleanField(default=False)

    class Meta:
        db_table = "youtube_videos_meta_data"


#User Registration

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    age = models.PositiveIntegerField()
    industry = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    job_responsibilities = models.TextField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'gender', 'age', 'industry', 'designation', 'job_responsibilities']

    def __str__(self):
        return self.email
    
    def has_module_perms(self, app_label):
        return self.is_staff

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

class YoutubeCleanData(models.Model):
    Search_Term = models.CharField(max_length=255)
    Video_URL = models.URLField()
    Video_Title = models.CharField(max_length=255)
    Channel_Name = models.CharField(max_length=255)
    Total_Subscribers = models.CharField(max_length=255)
    Total_Views = models.CharField(max_length=255)
    Total_Likes = models.CharField(max_length=255)
    Total_Dislikes = models.CharField(max_length=255)
    Total_Comments = models.CharField(max_length=255)
    Video_Description = models.TextField()
    Total_times_User_added_to_favorites = models.CharField(max_length=255)
    Video_Length = models.DurationField()
    Video_Category = models.CharField(max_length=255)
    Video_Tags = models.CharField(max_length=1000)
    Age_Restrictions = models.CharField(max_length=255)
    License = models.CharField(max_length=255)
    Captions_Available = models.BooleanField()
    search_term_video_url = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    is_flag = models.IntegerField(default=1)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Video_Title
    
    class Meta:
        db_table = "youtube_clena_data"

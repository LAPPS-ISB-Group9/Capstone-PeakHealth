"""vercel_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from employee import views
from rest_framework import routers
from django.conf.urls.static import static 
from django.conf import settings
# import logging.config
# from vercel_app.settings import LOGGING

from employee.views import UserSignInView, UserSignUpView
from assesments.views import TestRecordCreateView, TestRecordListView, save_rating
from feedback.views import FeedbackCreateView
from recommendations.views import TestParagraphViewSet, get_videos, get_test_paragraphs


# logging.config.dictConfig(LOGGING)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('example.urls')),
    path('hello/', views.hello_world, name='hello_world'),
    path('signin/', UserSignInView.as_view(), name='user_signin'),
    path('signup/', UserSignUpView.as_view(), name='user_signup'),
    path('test-records/', TestRecordCreateView.as_view(), name='test_records'),
    path('test-record/score/<int:user_id>/', TestRecordCreateView.as_view(), name='test-record-score'),
    path('testrecords/', TestRecordListView.as_view(), name='testrecords-list'),
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
    path('api/testparagraphs/', TestParagraphViewSet.as_view({'post': 'create'}), name='testparagraph-create'),
    # path('api/videorecommendations/', VideoRecommendationAPIView.as_view(), name='videorecomm-create'),
    # path('api/recommend/', recommend_videos, name='recommend_videos'),
    path('get_videos/<str:test_id>/', get_videos, name='get_videos'),
    path('test-paragraphs/<str:test_id>/', get_test_paragraphs, name='get_test_paragraphs'),
    # path('api/recommend/', recommend_videos, name='recommend_videos'),
    path('save_rating/', save_rating, name='save_rating'),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

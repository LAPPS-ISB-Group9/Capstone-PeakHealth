from django.contrib import admin
from .models import YoutubeVIdeosMetaData, YoutubeCleanData

class YoutubeVideosMetaAdmin(admin.ModelAdmin):
    list_display = ('id', 'search_term', 'video_title', 'channel_name', 'total_views', 'is_flag')
    list_filter = ('video_category', 'age_restrictions')
    search_fields = ('search_term', 'video_title', 'channel_name')

admin.site.register(YoutubeVIdeosMetaData, YoutubeVideosMetaAdmin)

@admin.register(YoutubeCleanData)
class YoutubeCleanDataAdmin(admin.ModelAdmin):
    list_display = ('Video_Title', 'Video_URL', 'Channel_Name', 'Video_Category', 'is_flag','created_date')
    list_filter = ('Channel_Name', 'Video_Category', 'Captions_Available')
    search_fields = ('Search_Term','Video_Title','Video_URL', 'Channel_Name')

from django.contrib import admin
from .models import AptitudeTest, AptitudeTestAttempt, PlaygroundSession, DailyActivity


@admin.register(AptitudeTest)
class AptitudeTestAdmin(admin.ModelAdmin):
    list_display = ['section', 'topic', 'difficulty', 'total_questions', 'time_limit_minutes']
    list_filter = ['section', 'difficulty']
    search_fields = ['topic']


@admin.register(AptitudeTestAttempt)
class AptitudeTestAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'test', 'score', 'total_questions', 'percentage', 'completed_at']
    list_filter = ['test__section', 'completed_at']
    search_fields = ['user__email', 'test__topic']


@admin.register(PlaygroundSession)
class PlaygroundSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'language', 'execution_time_seconds', 'success', 'created_at']
    list_filter = ['language', 'success', 'created_at']
    search_fields = ['user__email']


@admin.register(DailyActivity)
class DailyActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'learning_minutes', 'aptitude_minutes', 'playground_minutes', 'total_minutes']
    list_filter = ['date']
    search_fields = ['user__email']

from rest_framework import serializers
from .models import Phase, Lesson, UserProgress, CourseProgress

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'content', 'code_example', 'order', 
            'duration_minutes', 'has_validation', 'test_cases', 'validation_code'
        ]

class PhaseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Phase
        fields = ['id', 'title', 'description', 'order', 'is_premium', 'lessons']

class UserProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = ['id', 'lesson', 'lesson_title', 'completed', 'completed_at', 'notes']


class CourseProgressSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='get_course_id_display', read_only=True)
    
    class Meta:
        model = CourseProgress
        fields = [
            'id', 'course_id', 'course_name', 'progress_percentage', 
            'is_current', 'last_accessed', 'started_at', 'completed_at'
        ]
        read_only_fields = ['last_accessed', 'started_at']


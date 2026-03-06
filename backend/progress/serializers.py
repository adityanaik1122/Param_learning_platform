from rest_framework import serializers
from .models import AptitudeTest, AptitudeTestAttempt, PlaygroundSession, DailyActivity


class AptitudeTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AptitudeTest
        fields = '__all__'


class AptitudeTestAttemptSerializer(serializers.ModelSerializer):
    percentage = serializers.ReadOnlyField()
    test_topic = serializers.CharField(source='test.topic', read_only=True)
    test_section = serializers.CharField(source='test.section', read_only=True)
    
    class Meta:
        model = AptitudeTestAttempt
        fields = ['id', 'test', 'test_topic', 'test_section', 'score', 'total_questions', 
                  'percentage', 'time_taken_seconds', 'completed_at']
        read_only_fields = ['completed_at']


class PlaygroundSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaygroundSession
        fields = ['id', 'code', 'language', 'execution_time_seconds', 'success', 'created_at']
        read_only_fields = ['created_at']


class DailyActivitySerializer(serializers.ModelSerializer):
    total_minutes = serializers.ReadOnlyField()
    
    class Meta:
        model = DailyActivity
        fields = ['id', 'date', 'learning_minutes', 'aptitude_minutes', 
                  'playground_minutes', 'total_minutes']

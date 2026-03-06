from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Avg, Count, Q
from django.utils import timezone
from datetime import timedelta, date
from .models import AptitudeTest, AptitudeTestAttempt, PlaygroundSession, DailyActivity
from .serializers import (
    AptitudeTestSerializer, AptitudeTestAttemptSerializer,
    PlaygroundSessionSerializer, DailyActivitySerializer
)
from syllabus.models import UserProgress


class ProgressViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Get comprehensive dashboard data for the user"""
        user = request.user
        
        # Learning Path Progress
        total_lessons = UserProgress.objects.filter(user=user).count()
        completed_lessons = UserProgress.objects.filter(user=user, completed=True).count()
        
        # Get current topic (last accessed incomplete lesson)
        current_lesson = UserProgress.objects.filter(
            user=user, completed=False
        ).order_by('lesson__order').first()
        
        # Calculate streak
        streak = self._calculate_streak(user)
        
        # Aptitude Progress
        test_attempts = AptitudeTestAttempt.objects.filter(user=user)
        total_tests = test_attempts.values('test').distinct().count()
        avg_score = test_attempts.aggregate(Avg('score'))['score__avg'] or 0
        avg_percentage = test_attempts.aggregate(
            avg_pct=Avg(100.0 * models.F('score') / models.F('total_questions'))
        )['avg_pct'] or 0
        
        last_test = test_attempts.first()
        
        # Best category
        best_category = test_attempts.values('test__section').annotate(
            avg_score=Avg(100.0 * models.F('score') / models.F('total_questions'))
        ).order_by('-avg_score').first()
        
        # Playground Stats
        playground_sessions = PlaygroundSession.objects.filter(user=user)
        total_runs = playground_sessions.count()
        total_time = playground_sessions.aggregate(Sum('execution_time_seconds'))['execution_time_seconds__sum'] or 0
        
        last_session = playground_sessions.first()
        
        # Weekly Activity
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        weekly_data = []
        
        for i in range(7):
            day_date = week_start + timedelta(days=i)
            activity = DailyActivity.objects.filter(user=user, date=day_date).first()
            
            weekly_data.append({
                'day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                'hours': round((activity.total_minutes / 60) if activity else 0, 1)
            })
        
        # Skill Progress (calculated from completed lessons and test scores)
        skill_progress = self._calculate_skill_progress(user)
        
        return Response({
            'learningPath': {
                'completed': completed_lessons,
                'total': total_lessons,
                'currentTopic': current_lesson.lesson.title if current_lesson else 'Get Started',
                'lastAccessed': self._format_time_ago(current_lesson.completed_at if current_lesson else None),
                'streak': streak
            },
            'aptitude': {
                'testsCompleted': test_attempts.count(),
                'totalTests': 31,  # Total available tests
                'averageScore': round(avg_percentage, 1),
                'lastTest': last_test.test.topic if last_test else 'None',
                'bestCategory': best_category['test__section'].replace('_', ' ').title() if best_category else 'N/A'
            },
            'playground': {
                'codeRuns': total_runs,
                'totalTime': self._format_duration(total_time),
                'lastSession': self._format_time_ago(last_session.created_at if last_session else None),
                'favoriteLanguage': 'Python'
            },
            'weeklyActivity': weekly_data,
            'skillProgress': skill_progress
        })
    
    def _calculate_streak(self, user):
        """Calculate consecutive days of activity"""
        today = date.today()
        streak = 0
        current_date = today
        
        while True:
            has_activity = DailyActivity.objects.filter(
                user=user, 
                date=current_date,
                learning_minutes__gt=0
            ).exists()
            
            if not has_activity:
                break
            
            streak += 1
            current_date -= timedelta(days=1)
        
        return streak
    
    def _calculate_skill_progress(self, user):
        """Calculate skill levels based on completed lessons and test scores"""
        # This is a simplified calculation - you can make it more sophisticated
        python_lessons = UserProgress.objects.filter(
            user=user, 
            completed=True,
            lesson__phase__title__icontains='python'
        ).count()
        
        ml_lessons = UserProgress.objects.filter(
            user=user,
            completed=True,
            lesson__phase__title__icontains='machine learning'
        ).count()
        
        return [
            {'skill': 'Python', 'level': min(python_lessons * 10, 100)},
            {'skill': 'Machine Learning', 'level': min(ml_lessons * 15, 100)},
            {'skill': 'Data Analysis', 'level': min((python_lessons + ml_lessons) * 8, 100)},
            {'skill': 'Deep Learning', 'level': min(ml_lessons * 12, 100)},
            {'skill': 'NLP', 'level': min(ml_lessons * 10, 100)},
        ]
    
    def _format_time_ago(self, dt):
        """Format datetime as 'X hours/days ago'"""
        if not dt:
            return 'Never'
        
        now = timezone.now()
        diff = now - dt
        
        if diff.days > 0:
            return f"{diff.days} day{'s' if diff.days > 1 else ''} ago"
        elif diff.seconds >= 3600:
            hours = diff.seconds // 3600
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
        elif diff.seconds >= 60:
            minutes = diff.seconds // 60
            return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
        else:
            return "Just now"
    
    def _format_duration(self, seconds):
        """Format seconds as 'Xh Ym'"""
        if seconds == 0:
            return "0h 0m"
        
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        return f"{hours}h {minutes}m"


class AptitudeTestAttemptViewSet(viewsets.ModelViewSet):
    serializer_class = AptitudeTestAttemptSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return AptitudeTestAttempt.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PlaygroundSessionViewSet(viewsets.ModelViewSet):
    serializer_class = PlaygroundSessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return PlaygroundSession.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


from django.db import models

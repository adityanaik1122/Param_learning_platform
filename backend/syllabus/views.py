from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Phase, Lesson, UserProgress, CourseProgress
from .serializers import PhaseSerializer, LessonSerializer, UserProgressSerializer, CourseProgressSerializer

class SyllabusViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        phases = Phase.objects.prefetch_related('lessons').all()
        serializer = PhaseSerializer(phases, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def progress(self, request):
        progress = UserProgress.objects.filter(user=request.user)
        serializer = UserProgressSerializer(progress, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='course-progress')
    def course_progress(self, request):
        """Return progress for all courses for the authenticated user."""
        # Get or create progress for all courses
        course_progress_data = []
        
        for course_id, course_name in CourseProgress.COURSE_CHOICES:
            progress, created = CourseProgress.objects.get_or_create(
                user=request.user,
                course_id=course_id,
                defaults={'progress_percentage': 0}
            )
            course_progress_data.append({
                'id': course_id,
                'progress': progress.progress_percentage,
                'is_current': progress.is_current,
                'last_accessed': progress.last_accessed,
            })
        
        return Response(course_progress_data)
    
    @action(detail=False, methods=['post'], url_path='update-course-progress')
    def update_course_progress(self, request):
        """Update progress for a specific course."""
        course_id = request.data.get('course_id')
        progress_percentage = request.data.get('progress_percentage')
        is_current = request.data.get('is_current', False)
        
        if not course_id:
            return Response(
                {'error': 'course_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # If setting as current, unset all other courses
        if is_current:
            CourseProgress.objects.filter(user=request.user).update(is_current=False)
        
        progress, created = CourseProgress.objects.update_or_create(
            user=request.user,
            course_id=course_id,
            defaults={
                'progress_percentage': progress_percentage if progress_percentage is not None else 0,
                'is_current': is_current,
            }
        )
        
        serializer = CourseProgressSerializer(progress)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def mark_complete(self, request):
        lesson_id = request.data.get('lesson_id')
        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            lesson_id=lesson_id
        )
        progress.completed = True
        progress.completed_at = timezone.now()
        progress.save()
        
        serializer = UserProgressSerializer(progress)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def validate_submission(self, request):
        """
        Validate student code submission against test cases
        """
        lesson_id = request.data.get('lesson_id')
        validation_result = request.data.get('validation_result')
        
        if not lesson_id or not validation_result:
            return Response(
                {'error': 'lesson_id and validation_result are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return Response(
                {'error': 'Lesson not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # If validation was successful, mark lesson as complete
        if validation_result.get('success'):
            progress, created = UserProgress.objects.get_or_create(
                user=request.user,
                lesson=lesson
            )
            progress.completed = True
            progress.completed_at = timezone.now()
            progress.save()
            
            # Get next lesson
            next_lesson = Lesson.objects.filter(
                phase=lesson.phase,
                order__gt=lesson.order
            ).first()
            
            if not next_lesson:
                # Try next phase
                next_phase = Phase.objects.filter(
                    order__gt=lesson.phase.order
                ).first()
                if next_phase:
                    next_lesson = next_phase.lessons.first()
            
            return Response({
                'success': True,
                'lesson_completed': True,
                'next_lesson_id': next_lesson.id if next_lesson else None,
                'progress': UserProgressSerializer(progress).data
            })
        
        return Response({
            'success': False,
            'lesson_completed': False
        })

class LessonViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def retrieve(self, request, pk=None):
        try:
            lesson = Lesson.objects.get(pk=pk)
            serializer = LessonSerializer(lesson)
            return Response(serializer.data)
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

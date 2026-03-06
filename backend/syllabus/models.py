from django.db import models
from django.conf import settings

class Phase(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)
    is_premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

class Lesson(models.Model):
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    content = models.TextField()
    code_example = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    duration_minutes = models.IntegerField(default=30)
    
    # Validation fields
    has_validation = models.BooleanField(default=False)
    test_cases = models.JSONField(default=list, blank=True)  # List of test case objects
    validation_code = models.TextField(blank=True)  # Optional custom validation code
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.phase.title} - {self.title}"

class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ['user', 'lesson']
    
    def __str__(self):
        return f"{self.user.email} - {self.lesson.title}"


class CourseProgress(models.Model):
    """Track user progress for each course/learning path"""
    COURSE_CHOICES = [
        ('mern', 'Full Stack Web Development - MERN Stack'),
        ('python-fullstack', 'Full Stack Web Development - Python'),
        ('java-fullstack', 'Full Stack Web Development - Java'),
        ('mean', 'Full Stack Web Development - .Net & Angular'),
        ('react-native', 'Mobile App Development - React Native'),
        ('data-analytics', 'Data Analytics'),
        ('ai-ml', 'Data Science and AI/ML'),
        ('iot-ai', 'AI/ML Integration with IOT'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='course_progress')
    course_id = models.CharField(max_length=50, choices=COURSE_CHOICES)
    progress_percentage = models.IntegerField(default=0)
    is_current = models.BooleanField(default=False)
    last_accessed = models.DateTimeField(auto_now=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'course_id']
        ordering = ['-last_accessed']
    
    def __str__(self):
        return f"{self.user.email} - {self.get_course_id_display()} - {self.progress_percentage}%"
    
    def update_progress(self):
        """Calculate progress based on completed lessons"""
        # This will be implemented based on phase/lesson completion
        pass

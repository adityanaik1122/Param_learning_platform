from django.db import models
from django.conf import settings


class AptitudeTest(models.Model):
    SECTION_CHOICES = [
        ('logical', 'Logical Reasoning'),
        ('mathematics', 'Mathematics'),
        ('technical', 'Technical Aptitude'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    section = models.CharField(max_length=20, choices=SECTION_CHOICES)
    topic = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    total_questions = models.IntegerField()
    time_limit_minutes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['section', 'topic']
    
    def __str__(self):
        return f"{self.get_section_display()} - {self.topic}"


class AptitudeTestAttempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='test_attempts')
    test = models.ForeignKey(AptitudeTest, on_delete=models.CASCADE)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    time_taken_seconds = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.test.topic} - {self.score}/{self.total_questions}"
    
    @property
    def percentage(self):
        return (self.score / self.total_questions * 100) if self.total_questions > 0 else 0


class PlaygroundSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='playground_sessions')
    code = models.TextField()
    language = models.CharField(max_length=50, default='python')
    execution_time_seconds = models.FloatField()
    success = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.language} - {self.created_at}"


class DailyActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='daily_activities')
    date = models.DateField()
    learning_minutes = models.IntegerField(default=0)
    aptitude_minutes = models.IntegerField(default=0)
    playground_minutes = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.user.email} - {self.date}"
    
    @property
    def total_minutes(self):
        return self.learning_minutes + self.aptitude_minutes + self.playground_minutes

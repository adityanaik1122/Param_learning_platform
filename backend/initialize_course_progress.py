"""
Script to initialize course progress for existing users
Run this after migration to set up initial progress data
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from syllabus.models import CourseProgress

User = get_user_model()

def initialize_progress():
    """Initialize course progress for all users"""
    users = User.objects.all()
    
    # Sample progress data (you can customize this)
    sample_progress = {
        'mern': 45,
        'python-fullstack': 30,
        'java-fullstack': 20,
        'mean': 15,
        'react-native': 25,
        'data-analytics': 60,
        'ai-ml': 75,
        'iot-ai': 10,
    }
    
    for user in users:
        print(f"Initializing progress for user: {user.email}")
        
        for course_id, progress in sample_progress.items():
            course_progress, created = CourseProgress.objects.get_or_create(
                user=user,
                course_id=course_id,
                defaults={
                    'progress_percentage': progress,
                    'is_current': course_id == 'ai-ml',  # Set AI/ML as current
                }
            )
            
            if created:
                print(f"  Created progress for {course_id}: {progress}%")
            else:
                print(f"  Progress already exists for {course_id}")
    
    print("\nInitialization complete!")

if __name__ == '__main__':
    initialize_progress()

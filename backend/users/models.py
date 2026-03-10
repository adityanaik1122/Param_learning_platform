from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

<<<<<<< HEAD

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        STUDENT = 'STUDENT', 'Student'
        COLLEGE_STAFF = 'COLLEGE_STAFF', 'College Staff'
        PARENT = 'PARENT', 'Parent'
        MENTOR = 'MENTOR', 'Institute Mentor'

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=32, choices=Role.choices, default=Role.STUDENT)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    employee_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    department = models.CharField(max_length=100, blank=True, null=True)

    # Parent → Student link (only used when role='parent')
    linked_students = models.ManyToManyField(
        'self', symmetrical=False, blank=True,
        related_name='linked_parents',
        limit_choices_to={'role': Role.STUDENT},
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    @property
    def is_admin_role(self):
        return self.role == self.Role.ADMIN or self.is_superuser

    @property
    def is_teacher_role(self):
        return self.role == self.Role.COLLEGE_STAFF

    @property
    def is_mentor_role(self):
        return self.role == self.Role.MENTOR

    @property
    def is_parent_role(self):
        return self.role == self.Role.PARENT

    @property
    def is_student_role(self):
        return self.role == self.Role.STUDENT


class Batch(models.Model):
    name = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='mentored_batches',
        limit_choices_to={'role__in': [User.Role.MENTOR, User.Role.ADMIN]},
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Batches'
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.name} - {self.course}"


class StudentBatch(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='enrolled_batches',
        limit_choices_to={'role': User.Role.STUDENT},
    )
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='enrolled_students')
    enrollment_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ['student', 'batch']
        verbose_name_plural = 'Student Batches'

    def __str__(self):
        return f"{self.student.email} → {self.batch.name}"

=======
class User(AbstractUser):
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    avatar = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True)
    learning_progress = models.JSONField(default=dict)
<<<<<<< HEAD
    address = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

=======
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
    def __str__(self):
        return f"{self.user.email}'s Profile"

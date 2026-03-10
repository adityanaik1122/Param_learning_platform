from rest_framework import serializers
from .models import User, Batch, StudentBatch, UserProfile


class UserSerializer(serializers.ModelSerializer):
    subscription_status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'role',
            'phone_number', 'employee_id', 'department',
            'is_staff', 'is_superuser', 'subscription_status',
        ]

    def get_subscription_status(self, obj):
        try:
            from payments.models import Subscription
            subscription = Subscription.objects.filter(user=obj, is_active=True).first()
            if subscription:
                return {
                    'active': True,
                    'plan': subscription.plan,
                    'expires_at': subscription.expires_at.isoformat() if subscription.expires_at else None
                }
        except Exception:
            pass
        return {'active': False, 'plan': 'free'}


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)
    first_name = serializers.CharField(required=False, default='')
    last_name = serializers.CharField(required=False, default='')
    role = serializers.ChoiceField(choices=User.Role.choices, default=User.Role.STUDENT)
    phone_number = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value


class BatchSerializer(serializers.ModelSerializer):
    mentor_name = serializers.SerializerMethodField()
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Batch
        fields = [
            'id', 'name', 'course', 'description', 'start_date', 'end_date',
            'mentor', 'mentor_name', 'is_active', 'student_count',
            'created_at', 'updated_at',
        ]

    def get_mentor_name(self, obj):
        if obj.mentor:
            return f"{obj.mentor.first_name} {obj.mentor.last_name}".strip() or obj.mentor.email
        return None

    def get_student_count(self, obj):
        return obj.enrolled_students.filter(is_active=True).count()


class StudentBatchSerializer(serializers.ModelSerializer):
    student_email = serializers.CharField(source='student.email', read_only=True)
    student_name = serializers.SerializerMethodField()
    batch_name = serializers.CharField(source='batch.name', read_only=True)

    class Meta:
        model = StudentBatch
        fields = [
            'id', 'student', 'student_email', 'student_name',
            'batch', 'batch_name', 'enrollment_date', 'is_active',
        ]

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}".strip()


class UserManagementSerializer(serializers.ModelSerializer):
    """Admin-only serializer for full user CRUD."""
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'role',
            'phone_number', 'employee_id', 'department',
            'is_active', 'date_joined',
        ]
        read_only_fields = ['id', 'date_joined']


class ParentDashboardSerializer(serializers.Serializer):
    """Data a parent sees about their linked students."""
    students = serializers.SerializerMethodField()

    def get_students(self, parent_user):
        linked = parent_user.linked_students.all()
        return UserSerializer(linked, many=True).data


class LoginSerializer(serializers.Serializer):
    """
    Email/username + password login with role validation.

    Frontend should provide `selected_role` from the login dropdown.
    """
    identifier = serializers.CharField(help_text='Email or username')
    password = serializers.CharField(write_only=True)
    selected_role = serializers.ChoiceField(choices=User.Role.choices)

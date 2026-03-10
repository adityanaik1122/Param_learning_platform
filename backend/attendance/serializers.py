from rest_framework import serializers
from .models import Attendance, LeaveRequest


class AttendanceSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_name = serializers.SerializerMethodField()
    marked_by_email = serializers.CharField(source='marked_by.email', read_only=True, default=None)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id', 'user', 'user_email', 'user_name', 'date',
            'check_in', 'check_out', 'status', 'status_display',
            'marked_by', 'marked_by_email', 'remarks', 'batch',
            'created_at', 'updated_at',
        ]

    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()


class LeaveRequestSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    leave_type_display = serializers.CharField(source='get_leave_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    duration_days = serializers.IntegerField(read_only=True)

    class Meta:
        model = LeaveRequest
        fields = [
            'id', 'user', 'user_email', 'leave_type', 'leave_type_display',
            'start_date', 'end_date', 'duration_days', 'reason',
            'status', 'status_display', 'approved_by', 'reviewer_remarks',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['approved_by', 'reviewer_remarks']


class BulkAttendanceSerializer(serializers.Serializer):
    """Mark attendance for multiple students at once."""
    date = serializers.DateField()
    batch_id = serializers.IntegerField()
    records = serializers.ListField(
        child=serializers.DictField(),
        help_text="List of {user_id, status, check_in, check_out, remarks}",
    )

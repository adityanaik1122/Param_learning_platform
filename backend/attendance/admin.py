from django.contrib import admin
from .models import Attendance, LeaveRequest


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'status', 'check_in', 'check_out', 'batch', 'marked_by')
    list_filter = ('status', 'date', 'batch')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    date_hierarchy = 'date'


@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'leave_type', 'start_date', 'end_date', 'status', 'approved_by')
    list_filter = ('status', 'leave_type')
    search_fields = ('user__email', 'reason')
    date_hierarchy = 'start_date'

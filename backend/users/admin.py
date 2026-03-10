from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile, Batch, StudentBatch


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name', 'employee_id')
    ordering = ('-date_joined',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role & Institute Info', {
            'fields': ('role', 'phone_number', 'employee_id', 'department', 'linked_students'),
        }),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role & Institute Info', {
            'fields': ('role', 'phone_number', 'employee_id', 'department'),
        }),
    )
    filter_horizontal = ('linked_students', 'groups', 'user_permissions')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__email',)


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'mentor', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'course')
    search_fields = ('name', 'course')


@admin.register(StudentBatch)
class StudentBatchAdmin(admin.ModelAdmin):
    list_display = ('student', 'batch', 'enrollment_date', 'is_active')
    list_filter = ('is_active', 'batch')
    search_fields = ('student__email', 'batch__name')

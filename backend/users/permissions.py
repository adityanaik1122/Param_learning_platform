from rest_framework.permissions import BasePermission
from .models import User


class IsAdmin(BasePermission):
    """Full system access for admin/superuser."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and (request.user.role == User.Role.ADMIN or request.user.is_superuser)
        )


class IsCollegeStaff(BasePermission):
    """Access for college staff."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.COLLEGE_STAFF
        )


class IsMentor(BasePermission):
    """Access for institute mentors."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.MENTOR
        )


class IsParent(BasePermission):
    """Read-only access for parents to linked student data."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.PARENT
        )


class IsStudent(BasePermission):
    """Access for students to their own data."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.STUDENT
        )


class IsAdminOrMentor(BasePermission):
    """Access for admin or mentor roles."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and (request.user.role in [User.Role.ADMIN, User.Role.MENTOR] or request.user.is_superuser)
        )


class IsAdminOrCollegeStaff(BasePermission):
    """Access for admin or college staff roles."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and (request.user.role in [User.Role.ADMIN, User.Role.COLLEGE_STAFF] or request.user.is_superuser)
        )


class IsStaffRole(BasePermission):
    """Access for any staff role (admin, college staff, mentor)."""
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and (
                request.user.role in [User.Role.ADMIN, User.Role.COLLEGE_STAFF, User.Role.MENTOR]
                or request.user.is_superuser
            )
        )


# Backwards-compatible aliases (remove once all imports updated)
IsTeacher = IsCollegeStaff
IsAdminOrTeacher = IsAdminOrCollegeStaff

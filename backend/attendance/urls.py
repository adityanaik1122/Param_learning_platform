from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceViewSet, LeaveRequestViewSet

router = DefaultRouter()
router.register(r'records', AttendanceViewSet, basename='attendance')
router.register(r'leave', LeaveRequestViewSet, basename='leave-request')

urlpatterns = [
    path('', include(router.urls)),
]

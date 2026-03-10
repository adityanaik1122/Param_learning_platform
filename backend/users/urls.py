from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AuthViewSet, ProfileViewSet, UserManagementViewSet,
    BatchViewSet, StudentBatchViewSet,
)

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'manage', UserManagementViewSet, basename='user-management')
router.register(r'batches', BatchViewSet, basename='batches')
router.register(r'student-batches', StudentBatchViewSet, basename='student-batches')

urlpatterns = [
    path('', include(router.urls)),
]

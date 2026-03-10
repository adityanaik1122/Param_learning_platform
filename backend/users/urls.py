from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from .views import (
    AuthViewSet, ProfileViewSet, UserManagementViewSet,
    BatchViewSet, StudentBatchViewSet,
)
=======
from .views import AuthViewSet, ProfileViewSet
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'profile', ProfileViewSet, basename='profile')
<<<<<<< HEAD
router.register(r'manage', UserManagementViewSet, basename='user-management')
router.register(r'batches', BatchViewSet, basename='batches')
router.register(r'student-batches', StudentBatchViewSet, basename='student-batches')
=======
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProgressViewSet, AptitudeTestAttemptViewSet, PlaygroundSessionViewSet

router = DefaultRouter()
router.register(r'progress', ProgressViewSet, basename='progress')
router.register(r'test-attempts', AptitudeTestAttemptViewSet, basename='test-attempts')
router.register(r'playground-sessions', PlaygroundSessionViewSet, basename='playground-sessions')

urlpatterns = [
    path('', include(router.urls)),
]

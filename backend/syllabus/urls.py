from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SyllabusViewSet, LessonViewSet

router = DefaultRouter()
router.register(r'phases', SyllabusViewSet, basename='syllabus')
router.register(r'lessons', LessonViewSet, basename='lessons')

urlpatterns = [
    path('', include(router.urls)),
]

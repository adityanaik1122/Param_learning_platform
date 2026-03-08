from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TranslationViewSet, LessonTranslationViewSet

router = DefaultRouter()
router.register(r'', TranslationViewSet, basename='translation')
router.register(r'lessons', LessonTranslationViewSet, basename='lesson-translation')

urlpatterns = [
    path('', include(router.urls)),
]

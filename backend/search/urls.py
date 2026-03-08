from django.urls import path
from .views import search_topic

urlpatterns = [
    path('', search_topic, name='search_topic'),
]

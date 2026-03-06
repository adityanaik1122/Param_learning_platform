from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/syllabus/', include('syllabus.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/search/', include('search.urls')),
    path('api/', include('progress.urls')),
    path('api/translation/', include('translation.urls')),
]

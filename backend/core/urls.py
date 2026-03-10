from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Param Learning Platform API',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'users': '/api/users/',
            'syllabus': '/api/syllabus/',
            'payments': '/api/payments/',
            'search': '/api/search/',
            'progress': '/api/progress/',
            'translation': '/api/translation/',
        }
    }, indent=2)

urlpatterns = [
    path('', api_root, name='api-root'),
=======

urlpatterns = [
>>>>>>> 5a466be98bc48dec8448d8e8d70d985e9684170d
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/syllabus/', include('syllabus.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/search/', include('search.urls')),
    path('api/', include('progress.urls')),
    path('api/translation/', include('translation.urls')),
]

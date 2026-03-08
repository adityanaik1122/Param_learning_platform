"""
Create a superuser for testing purposes
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Superuser credentials
username = 'admin'
email = 'admin@test.com'
password = 'admin123'

# Check if superuser already exists
if User.objects.filter(username=username).exists():
    print(f"⚠️  Superuser '{username}' already exists!")
    user = User.objects.get(username=username)
    print(f"   Email: {user.email}")
    print(f"   Is superuser: {user.is_superuser}")
    print(f"   Is staff: {user.is_staff}")
else:
    # Create superuser
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    print("✅ Superuser created successfully!")
    print(f"   Username: {username}")
    print(f"   Email: {email}")
    print(f"   Password: {password}")
    print(f"   Is superuser: {user.is_superuser}")
    print(f"   Is staff: {user.is_staff}")

print("\n📝 You can use these credentials to:")
print("   - Login to the admin panel at: http://localhost:8000/admin/")
print("   - Login to the frontend at: http://localhost:5173/")
print("   - Test API endpoints with full permissions")

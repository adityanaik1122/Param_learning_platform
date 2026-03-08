import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User

# Check if superuser exists
user = User.objects.filter(email='admin@test.com').first()

if user:
    print(f"✓ User found: {user.email}")
    print(f"  - ID: {user.id}")
    print(f"  - Username: {user.username}")
    print(f"  - Is superuser: {user.is_superuser}")
    print(f"  - Is staff: {user.is_staff}")
    print(f"  - Is active: {user.is_active}")
    print(f"  - Password check (admin123): {user.check_password('admin123')}")
else:
    print("✗ User not found!")
    print("\nCreating superuser...")
    user = User.objects.create_superuser(
        username='admin@test.com',
        email='admin@test.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print(f"✓ Superuser created: {user.email}")

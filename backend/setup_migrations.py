"""
Setup migrations for all apps
This script creates migrations without interactive prompts
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.core.management import call_command

def setup_migrations():
    """Create and apply migrations for all apps"""
    
    print("=" * 60)
    print("Setting up database migrations")
    print("=" * 60)
    
    apps = ['users', 'payments', 'syllabus']
    
    for app in apps:
        print(f"\nCreating migrations for {app}...")
        try:
            call_command('makemigrations', app, interactive=False)
            print(f"✓ Migrations created for {app}")
        except Exception as e:
            print(f"✗ Error creating migrations for {app}: {e}")
    
    print("\n" + "-" * 60)
    print("Applying all migrations...")
    print("-" * 60)
    
    try:
        call_command('migrate', interactive=False)
        print("\n✓ All migrations applied successfully!")
    except Exception as e:
        print(f"\n✗ Error applying migrations: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("✓ Database setup complete!")
    print("=" * 60)
    print("\nYou can now run:")
    print("  python manage.py createsuperuser  # Create admin user")
    print("  python manage.py runserver         # Start the server")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    setup_migrations()

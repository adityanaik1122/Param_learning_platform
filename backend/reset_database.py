"""
Complete database reset script
This will drop all tables and recreate them from scratch
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.db import connection
from django.core.management import call_command

print("=" * 80)
print("DATABASE RESET SCRIPT")
print("=" * 80)

# Get all table names
with connection.cursor() as cursor:
    cursor.execute("""
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE' 
        AND TABLE_SCHEMA = 'dbo'
        AND TABLE_NAME NOT LIKE 'sys%'
    """)
    tables = [row[0] for row in cursor.fetchall()]

print(f"\nFound {len(tables)} tables to drop:")
for table in tables:
    print(f"  - {table}")

# Drop all tables
print("\nDropping all tables...")
with connection.cursor() as cursor:
    # Disable foreign key constraints
    cursor.execute("EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'")
    
    for table in tables:
        try:
            cursor.execute(f"DROP TABLE [{table}]")
            print(f"  ✓ Dropped {table}")
        except Exception as e:
            print(f"  ✗ Failed to drop {table}: {e}")

print("\n" + "=" * 80)
print("Running migrations to recreate tables...")
print("=" * 80)

# Run migrations
call_command('migrate', verbosity=2)

print("\n" + "=" * 80)
print("✅ Database reset complete!")
print("=" * 80)
print("\nNext steps:")
print("  1. Create a superuser: python manage.py createsuperuser")
print("  2. Test registration: python test_auth_endpoints.py")

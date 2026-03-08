#!/usr/bin/env python
"""
Quick script to check if all 23 languages are populated in the database.
Run: python check_languages.py
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from translation.models import SupportedLanguage

def check_languages():
    print("=" * 60)
    print("CHECKING TRANSLATION LANGUAGES")
    print("=" * 60)
    
    languages = SupportedLanguage.objects.all().order_by('order')
    count = languages.count()
    
    print(f"\n✅ Total Languages: {count}/23\n")
    
    if count == 0:
        print("❌ No languages found!")
        print("\nRun this command to populate languages:")
        print("   python manage.py populate_languages")
        return
    
    print("Languages in database:")
    print("-" * 60)
    print(f"{'#':<4} {'Code':<6} {'Name':<15} {'Native Name':<20}")
    print("-" * 60)
    
    for idx, lang in enumerate(languages, 1):
        status = "✅" if lang.is_active else "❌"
        print(f"{idx:<4} {lang.code:<6} {lang.name:<15} {lang.native_name:<20} {status}")
    
    print("-" * 60)
    
    if count < 23:
        print(f"\n⚠️  Warning: Only {count} languages found. Expected 23.")
        print("Run: python manage.py populate_languages")
    else:
        print("\n✅ All 23 languages are populated!")
    
    # Check active languages
    active_count = languages.filter(is_active=True).count()
    print(f"\n📊 Active Languages: {active_count}/{count}")
    
    if active_count < count:
        inactive = languages.filter(is_active=False)
        print("\n⚠️  Inactive languages:")
        for lang in inactive:
            print(f"   - {lang.name} ({lang.code})")
    
    print("\n" + "=" * 60)
    print("API Endpoint: http://localhost:8000/api/translation/supported_languages/")
    print("=" * 60)

if __name__ == '__main__':
    try:
        check_languages()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure:")
        print("1. Database is running")
        print("2. Migrations are applied: python manage.py migrate")
        print("3. You're in the backend directory")

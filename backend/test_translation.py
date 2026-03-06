"""
Quick test script for IndicTrans2 translation
Run: python test_translation.py
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from translation.indictrans_service import IndicTransService, LANGUAGE_CODES
from translation.models import Translation, SupportedLanguage

def test_translation():
    print("=" * 60)
    print("IndicTrans2 Translation Test")
    print("=" * 60)
    
    # Check supported languages
    print("\n1. Checking supported languages...")
    languages = SupportedLanguage.objects.filter(is_active=True)
    print(f"   Found {languages.count()} languages")
    
    # Initialize service
    print("\n2. Initializing IndicTrans2 service...")
    service = IndicTransService()
    print(f"   Device: {service.device}")
    
    # Test translation
    print("\n3. Testing translation (English to Hindi)...")
    test_text = "Welcome to Machine Learning"
    print(f"   Original: {test_text}")
    
    try:
        translated = service.translate(test_text, target_lang='hin_Deva')
        print(f"   Translated: {translated}")
        
        # Save to cache
        Translation.objects.create(
            source_text=test_text,
            source_language='en',
            target_language='hi',
            translated_text=translated,
            translation_service='indictrans2',
            content_type='test'
        )
        print("   ✓ Translation cached successfully")
        
    except Exception as e:
        print(f"   ✗ Translation failed: {e}")
        return False
    
    # Test cache lookup
    print("\n4. Testing cache lookup...")
    import hashlib
    text_hash = hashlib.sha256(test_text.encode('utf-8')).hexdigest()
    cached = Translation.objects.filter(
        source_text_hash=text_hash,
        target_language='hi'
    ).first()
    
    if cached:
        print(f"   ✓ Found in cache: {cached.translated_text}")
    else:
        print("   ✗ Not found in cache")
    
    # Test batch translation
    print("\n5. Testing batch translation...")
    batch_texts = ["Hello", "Goodbye", "Thank you"]
    print(f"   Texts: {batch_texts}")
    
    try:
        batch_results = service.translate_batch(batch_texts, target_lang='hin_Deva')
        for orig, trans in zip(batch_texts, batch_results):
            print(f"   {orig} → {trans}")
        print("   ✓ Batch translation successful")
    except Exception as e:
        print(f"   ✗ Batch translation failed: {e}")
    
    print("\n" + "=" * 60)
    print("Test completed!")
    print("=" * 60)

if __name__ == '__main__':
    test_translation()

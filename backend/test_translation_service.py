#!/usr/bin/env python
"""
Test script to check if IndicTrans2 translation service works.
Run: python test_translation_service.py
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from translation.indictrans_service import IndicTransService

def test_translation():
    print("=" * 60)
    print("TESTING INDICTRANS2 TRANSLATION SERVICE")
    print("=" * 60)
    
    try:
        print("\n1. Initializing IndicTransService...")
        service = IndicTransService()
        print("✅ Service initialized")
        
        print("\n2. Loading model (this may take 3-5 seconds)...")
        service.load_model()
        print("✅ Model loaded successfully!")
        
        print("\n3. Testing translation (English to Hindi)...")
        text = "Hello, World!"
        target_lang = "hin_Deva"
        
        result = service.translate(text, target_lang)
        print(f"   Original: {text}")
        print(f"   Translated: {result}")
        print("✅ Translation successful!")
        
        print("\n4. Testing batch translation...")
        texts = ["Hello", "World", "Welcome"]
        results = service.translate_batch(texts, target_lang)
        for orig, trans in zip(texts, results):
            print(f"   {orig} → {trans}")
        print("✅ Batch translation successful!")
        
        print("\n" + "=" * 60)
        print("ALL TESTS PASSED! ✅")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        print("\nFull error details:")
        import traceback
        traceback.print_exc()
        
        print("\n" + "=" * 60)
        print("TROUBLESHOOTING:")
        print("=" * 60)
        print("\n1. Check if dependencies are installed:")
        print("   pip install transformers==4.41.0 sentencepiece==0.2.0 sacremoses==0.1.1")
        print("\n2. Check if you have enough memory (need ~2-3GB RAM)")
        print("\n3. Check backend logs for more details")
        print("\n4. Try restarting the backend server")

if __name__ == '__main__':
    test_translation()

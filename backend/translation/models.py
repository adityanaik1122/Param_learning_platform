from django.db import models
import hashlib


class Translation(models.Model):
    """Store translated content for caching"""
    source_text = models.TextField()
    source_text_hash = models.CharField(max_length=64, db_index=True)  # SHA256 hash for indexing
    source_language = models.CharField(max_length=10, default='en')
    target_language = models.CharField(max_length=10, db_index=True)
    translated_text = models.TextField()
    translation_service = models.CharField(max_length=50, default='indictrans2')
    content_type = models.CharField(max_length=50, blank=True, db_index=True)  # 'lesson', 'phase', 'ui'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['source_text_hash', 'source_language', 'target_language']
        indexes = [
            models.Index(fields=['source_text_hash', 'target_language']),
            models.Index(fields=['content_type', 'target_language']),
        ]
    
    def save(self, *args, **kwargs):
        # Auto-generate hash from source_text
        if not self.source_text_hash:
            self.source_text_hash = hashlib.sha256(self.source_text.encode('utf-8')).hexdigest()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.source_language} -> {self.target_language}: {self.source_text[:50]}"


class SupportedLanguage(models.Model):
    """Supported languages for the platform"""
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    native_name = models.CharField(max_length=100)
    indic_code = models.CharField(max_length=20)  # IndicTrans2 language code
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.native_name})"

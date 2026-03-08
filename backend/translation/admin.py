from django.contrib import admin
from .models import Translation, SupportedLanguage


@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ['source_text_preview', 'source_language', 'target_language', 'translation_service', 'content_type', 'created_at']
    list_filter = ['target_language', 'translation_service', 'content_type', 'created_at']
    search_fields = ['source_text', 'translated_text']
    readonly_fields = ['created_at', 'updated_at']
    
    def source_text_preview(self, obj):
        return obj.source_text[:50] + '...' if len(obj.source_text) > 50 else obj.source_text
    source_text_preview.short_description = 'Source Text'


@admin.register(SupportedLanguage)
class SupportedLanguageAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'native_name', 'indic_code', 'is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['code', 'name', 'native_name']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'name']

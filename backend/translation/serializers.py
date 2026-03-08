from rest_framework import serializers
from .models import Translation, SupportedLanguage


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = '__all__'


class SupportedLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportedLanguage
        fields = ['code', 'name', 'native_name', 'indic_code', 'is_active']

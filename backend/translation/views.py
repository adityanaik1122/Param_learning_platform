from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Translation, SupportedLanguage
from .serializers import TranslationSerializer, SupportedLanguageSerializer
from .indictrans_service import IndicTransService, LANGUAGE_CODES
import logging
import hashlib

logger = logging.getLogger(__name__)


class TranslationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.translator = IndicTransService()
    
    @action(detail=False, methods=['post'])
    def translate(self, request):
        """Translate text using IndicTrans2"""
        text = request.data.get('text')
        target_lang = request.data.get('target_language')
        content_type = request.data.get('content_type', 'general')
        
        if not text or not target_lang:
            return Response(
                {'error': 'text and target_language are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Return original if target is English
        if target_lang == 'en':
            return Response({
                'original_text': text,
                'translated_text': text,
                'source_language': 'en',
                'target_language': 'en',
                'cached': False
            })
        
        # Check cache first
        text_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
        cached = Translation.objects.filter(
            source_text_hash=text_hash,
            source_language='en',
            target_language=target_lang
        ).first()
        
        if cached:
            return Response({
                'original_text': text,
                'translated_text': cached.translated_text,
                'source_language': 'en',
                'target_language': target_lang,
                'cached': True
            })
        
        # Translate
        try:
            indic_lang_code = LANGUAGE_CODES.get(target_lang)
            if not indic_lang_code:
                return Response(
                    {'error': f'Language {target_lang} not supported'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            translated_text = self.translator.translate(
                text,
                target_lang=indic_lang_code
            )
            
            # Cache result
            Translation.objects.create(
                source_text=text,
                source_language='en',
                target_language=target_lang,
                translated_text=translated_text,
                translation_service='indictrans2',
                content_type=content_type
            )
            
            return Response({
                'original_text': text,
                'translated_text': translated_text,
                'source_language': 'en',
                'target_language': target_lang,
                'cached': False
            })
            
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def translate_batch(self, request):
        """Translate multiple texts"""
        texts = request.data.get('texts', [])
        target_lang = request.data.get('target_language')
        content_type = request.data.get('content_type', 'general')
        
        if not texts or not target_lang:
            return Response(
                {'error': 'texts and target_language are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Return original if target is English
        if target_lang == 'en':
            return Response({
                'translations': [
                    {'original': t, 'translated': t, 'cached': False}
                    for t in texts
                ]
            })
        
        try:
            indic_lang_code = LANGUAGE_CODES.get(target_lang)
            if not indic_lang_code:
                return Response(
                    {'error': f'Language {target_lang} not supported'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check cache and translate uncached
            results = []
            texts_to_translate = []
            indices_to_translate = []
            
            for i, text in enumerate(texts):
                if not text or not text.strip():
                    results.append({
                        'original': text,
                        'translated': text,
                        'cached': False
                    })
                    continue
                
                text_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
                cached = Translation.objects.filter(
                    source_text_hash=text_hash,
                    source_language='en',
                    target_language=target_lang
                ).first()
                
                if cached:
                    results.append({
                        'original': text,
                        'translated': cached.translated_text,
                        'cached': True
                    })
                else:
                    results.append(None)
                    texts_to_translate.append(text)
                    indices_to_translate.append(i)
            
            # Translate uncached texts
            if texts_to_translate:
                translated_texts = self.translator.translate_batch(
                    texts_to_translate,
                    target_lang=indic_lang_code
                )
                
                # Update results and cache
                for j, translated in enumerate(translated_texts):
                    original_index = indices_to_translate[j]
                    original_text = texts_to_translate[j]
                    
                    results[original_index] = {
                        'original': original_text,
                        'translated': translated,
                        'cached': False
                    }
                    
                    # Cache
                    Translation.objects.create(
                        source_text=original_text,
                        source_language='en',
                        target_language=target_lang,
                        translated_text=translated,
                        translation_service='indictrans2',
                        content_type=content_type
                    )
            
            return Response({'translations': results})
            
        except Exception as e:
            logger.error(f"Batch translation error: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def supported_languages(self, request):
        """Get list of supported languages"""
        languages = SupportedLanguage.objects.filter(is_active=True)
        serializer = SupportedLanguageSerializer(languages, many=True)
        return Response(serializer.data)


class LessonTranslationViewSet(viewsets.ViewSet):
    """Translate lesson content"""
    permission_classes = [IsAuthenticated]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.translator = IndicTransService()
    
    @action(detail=True, methods=['get'])
    def translate_lesson(self, request, pk=None):
        """Get translated lesson content"""
        from syllabus.models import Lesson
        
        target_lang = request.query_params.get('language', 'en')
        
        try:
            lesson = Lesson.objects.get(pk=pk)
        except Lesson.DoesNotExist:
            return Response(
                {'error': 'Lesson not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Return original if English
        if target_lang == 'en':
            from syllabus.serializers import LessonSerializer
            serializer = LessonSerializer(lesson)
            return Response(serializer.data)
        
        # Get IndicTrans code
        indic_lang_code = LANGUAGE_CODES.get(target_lang)
        if not indic_lang_code:
            return Response(
                {'error': f'Language {target_lang} not supported'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Translate lesson fields
        try:
            # Check cache for title
            title_hash = hashlib.sha256(lesson.title.encode('utf-8')).hexdigest()
            title_cached = Translation.objects.filter(
                source_text_hash=title_hash,
                target_language=target_lang
            ).first()
            
            if title_cached:
                translated_title = title_cached.translated_text
            else:
                translated_title = self.translator.translate(
                    lesson.title, indic_lang_code, content_type='lesson_title'
                )
                Translation.objects.create(
                    source_text=lesson.title,
                    target_language=target_lang,
                    translated_text=translated_title,
                    translation_service='indictrans2',
                    content_type='lesson_title'
                )
            
            # Check cache for content
            content_hash = hashlib.sha256(lesson.content.encode('utf-8')).hexdigest()
            content_cached = Translation.objects.filter(
                source_text_hash=content_hash,
                target_language=target_lang
            ).first()
            
            if content_cached:
                translated_content = content_cached.translated_text
            else:
                translated_content = self.translator.translate(
                    lesson.content, indic_lang_code, content_type='lesson_content'
                )
                Translation.objects.create(
                    source_text=lesson.content,
                    target_language=target_lang,
                    translated_text=translated_content,
                    translation_service='indictrans2',
                    content_type='lesson_content'
                )
            
            translated_lesson = {
                'id': lesson.id,
                'title': translated_title,
                'content': translated_content,
                'code_example': lesson.code_example,  # Don't translate code
                'order': lesson.order,
                'duration_minutes': lesson.duration_minutes,
                'has_validation': lesson.has_validation,
                'test_cases': lesson.test_cases,
            }
            
            return Response(translated_lesson)
            
        except Exception as e:
            logger.error(f"Lesson translation error: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

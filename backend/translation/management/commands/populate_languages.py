from django.core.management.base import BaseCommand
from translation.models import SupportedLanguage


class Command(BaseCommand):
    help = 'Populate supported languages for IndicTrans2'

    def handle(self, *args, **options):
        languages = [
            {'code': 'en', 'name': 'English', 'native_name': 'English', 'indic_code': 'eng_Latn', 'order': 0},
            {'code': 'hi', 'name': 'Hindi', 'native_name': 'हिन्दी', 'indic_code': 'hin_Deva', 'order': 1},
            {'code': 'bn', 'name': 'Bengali', 'native_name': 'বাংলা', 'indic_code': 'ben_Beng', 'order': 2},
            {'code': 'ta', 'name': 'Tamil', 'native_name': 'தமிழ்', 'indic_code': 'tam_Taml', 'order': 3},
            {'code': 'te', 'name': 'Telugu', 'native_name': 'తెలుగు', 'indic_code': 'tel_Telu', 'order': 4},
            {'code': 'mr', 'name': 'Marathi', 'native_name': 'मराठी', 'indic_code': 'mar_Deva', 'order': 5},
            {'code': 'gu', 'name': 'Gujarati', 'native_name': 'ગુજરાતી', 'indic_code': 'guj_Gujr', 'order': 6},
            {'code': 'kn', 'name': 'Kannada', 'native_name': 'ಕನ್ನಡ', 'indic_code': 'kan_Knda', 'order': 7},
            {'code': 'ml', 'name': 'Malayalam', 'native_name': 'മലയാളം', 'indic_code': 'mal_Mlym', 'order': 8},
            {'code': 'pa', 'name': 'Punjabi', 'native_name': 'ਪੰਜਾਬੀ', 'indic_code': 'pan_Guru', 'order': 9},
            {'code': 'or', 'name': 'Odia', 'native_name': 'ଓଡ଼ିଆ', 'indic_code': 'ory_Orya', 'order': 10},
            {'code': 'as', 'name': 'Assamese', 'native_name': 'অসমীয়া', 'indic_code': 'asm_Beng', 'order': 11},
            {'code': 'ur', 'name': 'Urdu', 'native_name': 'اردو', 'indic_code': 'urd_Arab', 'order': 12},
            {'code': 'sa', 'name': 'Sanskrit', 'native_name': 'संस्कृतम्', 'indic_code': 'san_Deva', 'order': 13},
            {'code': 'ne', 'name': 'Nepali', 'native_name': 'नेपाली', 'indic_code': 'npi_Deva', 'order': 14},
            {'code': 'si', 'name': 'Sinhala', 'native_name': 'සිංහල', 'indic_code': 'sin_Sinh', 'order': 15},
            {'code': 'sd', 'name': 'Sindhi', 'native_name': 'سنڌي', 'indic_code': 'snd_Arab', 'order': 16},
            {'code': 'ks', 'name': 'Kashmiri', 'native_name': 'कॉशुर', 'indic_code': 'kas_Arab', 'order': 17},
            {'code': 'doi', 'name': 'Dogri', 'native_name': 'डोगरी', 'indic_code': 'doi_Deva', 'order': 18},
            {'code': 'mai', 'name': 'Maithili', 'native_name': 'मैथिली', 'indic_code': 'mai_Deva', 'order': 19},
            {'code': 'mni', 'name': 'Manipuri', 'native_name': 'মৈতৈলোন্', 'indic_code': 'mni_Mtei', 'order': 20},
            {'code': 'sat', 'name': 'Santali', 'native_name': 'ᱥᱟᱱᱛᱟᱲᱤ', 'indic_code': 'sat_Olck', 'order': 21},
            {'code': 'gom', 'name': 'Konkani', 'native_name': 'कोंकणी', 'indic_code': 'gom_Deva', 'order': 22},
        ]
        
        created_count = 0
        updated_count = 0
        
        for lang_data in languages:
            lang, created = SupportedLanguage.objects.update_or_create(
                code=lang_data['code'],
                defaults=lang_data
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {lang.name}'))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {lang.name}'))
        
        self.stdout.write(self.style.SUCCESS(
            f'\nCompleted! Created: {created_count}, Updated: {updated_count}'
        ))

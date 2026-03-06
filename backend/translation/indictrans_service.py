"""
IndicTrans2 Translation Service
Free, open-source translation for Indian languages
"""
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import logging

logger = logging.getLogger(__name__)


class IndicTransService:
    """
    IndicTrans2 translation service for Indian languages
    Model: ai4bharat/indictrans2-en-indic-1B
    """
    
    def __init__(self):
        self.model_name = "ai4bharat/indictrans2-en-indic-1B"
        self.tokenizer = None
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"IndicTrans will use device: {self.device}")
        
    def load_model(self):
        """Load model on first use (lazy loading)"""
        if self.model is None:
            try:
                logger.info(f"Loading IndicTrans2 model on {self.device}...")
                self.tokenizer = AutoTokenizer.from_pretrained(
                    self.model_name,
                    trust_remote_code=True
                )
                self.model = AutoModelForSeq2SeqLM.from_pretrained(
                    self.model_name,
                    trust_remote_code=True
                )
                self.model.to(self.device)
                self.model.eval()
                logger.info("IndicTrans2 model loaded successfully!")
            except Exception as e:
                logger.error(f"Failed to load IndicTrans2 model: {e}")
                raise
    
    def translate(self, text, target_lang, source_lang='eng_Latn'):
        """
        Translate text to target language
        
        Args:
            text: Text to translate
            target_lang: Target language code (e.g., 'hin_Deva' for Hindi)
            source_lang: Source language code (default: 'eng_Latn' for English)
        
        Returns:
            Translated text
        """
        if not text or not text.strip():
            return text
            
        self.load_model()
        
        try:
            # Prepare input
            inputs = self.tokenizer(
                text,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=512
            ).to(self.device)
            
            # Generate translation
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **inputs,
                    forced_bos_token_id=self.tokenizer.lang_code_to_id[target_lang],
                    max_length=512,
                    num_beams=5,
                    num_return_sequences=1,
                )
            
            # Decode output
            translated_text = self.tokenizer.batch_decode(
                generated_tokens,
                skip_special_tokens=True
            )[0]
            
            return translated_text
            
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return text  # Return original text on error
    
    def translate_batch(self, texts, target_lang, source_lang='eng_Latn'):
        """
        Translate multiple texts at once
        
        Args:
            texts: List of texts to translate
            target_lang: Target language code
            source_lang: Source language code
        
        Returns:
            List of translated texts
        """
        if not texts:
            return []
            
        self.load_model()
        
        try:
            # Filter empty texts
            non_empty_texts = [t for t in texts if t and t.strip()]
            if not non_empty_texts:
                return texts
            
            # Prepare inputs
            inputs = self.tokenizer(
                non_empty_texts,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=512
            ).to(self.device)
            
            # Generate translations
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **inputs,
                    forced_bos_token_id=self.tokenizer.lang_code_to_id[target_lang],
                    max_length=512,
                    num_beams=5,
                    num_return_sequences=1,
                )
            
            # Decode outputs
            translated_texts = self.tokenizer.batch_decode(
                generated_tokens,
                skip_special_tokens=True
            )
            
            return translated_texts
            
        except Exception as e:
            logger.error(f"Batch translation error: {e}")
            return texts  # Return original texts on error


# Language code mapping (ISO 639-1 to IndicTrans2)
LANGUAGE_CODES = {
    'hi': 'hin_Deva',  # Hindi
    'bn': 'ben_Beng',  # Bengali
    'ta': 'tam_Taml',  # Tamil
    'te': 'tel_Telu',  # Telugu
    'mr': 'mar_Deva',  # Marathi
    'gu': 'guj_Gujr',  # Gujarati
    'kn': 'kan_Knda',  # Kannada
    'ml': 'mal_Mlym',  # Malayalam
    'pa': 'pan_Guru',  # Punjabi
    'or': 'ory_Orya',  # Odia
    'as': 'asm_Beng',  # Assamese
    'ur': 'urd_Arab',  # Urdu
    'sa': 'san_Deva',  # Sanskrit
    'ne': 'npi_Deva',  # Nepali
    'si': 'sin_Sinh',  # Sinhala
    'sd': 'snd_Arab',  # Sindhi
    'ks': 'kas_Arab',  # Kashmiri
    'doi': 'doi_Deva', # Dogri
    'mai': 'mai_Deva', # Maithili
    'mni': 'mni_Mtei', # Manipuri
    'sat': 'sat_Olck', # Santali
    'gom': 'gom_Deva', # Konkani
}

# Reverse mapping
INDIC_TO_ISO = {v: k for k, v in LANGUAGE_CODES.items()}

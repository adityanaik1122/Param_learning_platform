"""
IndicTrans2 Translation Service - Official Implementation
Using IndicTransToolkit for proper preprocessing and postprocessing
"""
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit.processor import IndicProcessor
import logging

logger = logging.getLogger(__name__)


class IndicTransService:
    """
    Official IndicTrans2 translation service using IndicTransToolkit
    Model: ai4bharat/indictrans2-en-indic-1B
    """
    
    def __init__(self):
        self.model_name = "ai4bharat/indictrans2-en-indic-1B"
        self.model = None
        self.tokenizer = None
        self.processor = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"IndicTransService initialized. Using device: {self.device}")
    
    def load_model(self):
        """Load the IndicTrans2 model, tokenizer, and processor."""
        if self.model is not None:
            return
        
        try:
            logger.info("Loading IndicTrans2 model...")
            
            # Load tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(
                self.model_name,
                trust_remote_code=True
            )
            
            # Load model with appropriate dtype
            dtype = torch.float16 if self.device == "cuda" else torch.float32
            
            self.model = AutoModelForSeq2SeqLM.from_pretrained(
                self.model_name,
                trust_remote_code=True,
                torch_dtype=dtype
            ).to(self.device)
            
            # Initialize IndicProcessor
            self.processor = IndicProcessor(inference=True)
            
            logger.info("Model loaded successfully!")
            
        except Exception as e:
            logger.error(f"Failed to load IndicTrans2 model: {e}")
            raise
    
    def translate(self, text: str, target_language: str, source_language: str = "eng_Latn") -> str:
        """
        Translate a single text from source to target language.
        
        Args:
            text: Text to translate
            target_language: Target language code (e.g., 'hin_Deva')
            source_language: Source language code (default: 'eng_Latn')
        
        Returns:
            Translated text
        """
        if not text or not text.strip():
            return text
        
        # Load model if not loaded
        if self.model is None:
            self.load_model()
        
        try:
            # Preprocess
            batch = self.processor.preprocess_batch(
                [text],
                src_lang=source_language,
                tgt_lang=target_language
            )
            
            # Tokenize
            inputs = self.tokenizer(
                batch,
                truncation=True,
                padding="longest",
                return_tensors="pt",
                return_attention_mask=True
            ).to(self.device)
            
            # Generate translation
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **inputs,
                    use_cache=True,
                    min_length=0,
                    max_length=256,
                    num_beams=5,
                    num_return_sequences=1
                )
            
            # Decode
            generated_text = self.tokenizer.batch_decode(
                generated_tokens,
                skip_special_tokens=True,
                clean_up_tokenization_spaces=True
            )
            
            # Postprocess
            translations = self.processor.postprocess_batch(
                generated_text,
                lang=target_language
            )
            
            return translations[0] if translations else text
            
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return text  # Return original text on error
    
    def translate_batch(self, texts: list, target_language: str, source_language: str = "eng_Latn") -> list:
        """
        Translate multiple texts from source to target language.
        
        Args:
            texts: List of texts to translate
            target_language: Target language code (e.g., 'hin_Deva')
            source_language: Source language code (default: 'eng_Latn')
        
        Returns:
            List of translated texts
        """
        if not texts:
            return []
        
        # Load model if not loaded
        if self.model is None:
            self.load_model()
        
        # Filter empty texts
        non_empty_texts = [t if t and t.strip() else "" for t in texts]
        texts_to_translate = [t for t in non_empty_texts if t]
        
        if not texts_to_translate:
            return texts
        
        try:
            # Preprocess batch
            batch = self.processor.preprocess_batch(
                texts_to_translate,
                src_lang=source_language,
                tgt_lang=target_language
            )
            
            # Tokenize
            inputs = self.tokenizer(
                batch,
                truncation=True,
                padding="longest",
                return_tensors="pt",
                return_attention_mask=True
            ).to(self.device)
            
            # Generate translations
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **inputs,
                    use_cache=True,
                    min_length=0,
                    max_length=256,
                    num_beams=5,
                    num_return_sequences=1
                )
            
            # Decode
            generated_texts = self.tokenizer.batch_decode(
                generated_tokens,
                skip_special_tokens=True,
                clean_up_tokenization_spaces=True
            )
            
            # Postprocess
            translations = self.processor.postprocess_batch(
                generated_texts,
                lang=target_language
            )
            
            return translations
                    
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

export const phase6NLPContent = {
  id: 6,
  title: 'Phase 6: Natural Language Processing',
  topics: [
    'Text Preprocessing & Tokenization',
    'Word Embeddings & Semantic Similarity',
    'Text Classification & Sentiment Analysis',
    'Named Entity Recognition (NER)',
    'Sequence-to-Sequence Models',
    'Attention Mechanisms for NLP',
    'Transformer Models (BERT)',
    'Text Generation with GPT',
    'Machine Translation',
    'Chatbots & Question Answering',
    'Topic Modeling (LDA)',
    'Document Similarity & Information Retrieval',
    'Hugging Face Ecosystem'
  ],
  lessons: [
    {
      title: 'Text Preprocessing & Tokenization',
      description: `
## Text Preprocessing & Tokenization

### Overview
Text preprocessing is the foundation of NLP. Raw text must be cleaned and transformed into a format that machine learning models can understand.

### Key Concepts

**Text Cleaning**:
- Remove HTML tags, URLs, special characters
- Convert to lowercase
- Handle contractions (don't → do not)
- Remove extra whitespace

**Tokenization**:
- Word tokenization: Split text into words
- Sentence tokenization: Split into sentences
- Subword tokenization: Split into meaningful units (BPE, WordPiece)

**Normalization**:
- Stemming: Reduce words to root form (running → run)
- Lemmatization: Convert to dictionary form (better → good)
- Stop word removal: Remove common words (the, is, at)

**Libraries**:
- NLTK: Comprehensive NLP toolkit
- spaCy: Industrial-strength NLP
- Hugging Face Tokenizers: Fast modern tokenizers

### Problem Statement
1. Clean and preprocess raw text
2. Tokenize text into words and sentences
3. Apply stemming and lemmatization
4. Remove stop words
5. Analyze token statistics

### Expected Output
- Cleaned text
- Token counts and frequencies
- Processed text ready for modeling
`,
      starterCode: `import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import re
from collections import Counter

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# Sample text
text = """
Natural Language Processing (NLP) is amazing! It's revolutionizing how computers 
understand human language. Visit https://nlp.org for more info. #NLP #AI
"""

# TODO: Clean text - remove URLs, special characters
def clean_text(text):
    # Remove URLs
    text = 
    # Remove special characters and digits
    text = 
    # Convert to lowercase
    text = 
    return text

# TODO: Tokenize into words
cleaned = clean_text(text)
words = 

# TODO: Remove stop words
stop_words = set(stopwords.words('english'))
filtered_words = 

# TODO: Apply stemming
stemmer = PorterStemmer()
stemmed = 

# TODO: Apply lemmatization
lemmatizer = WordNetLemmatizer()
lemmatized = 

print(f"Original: {text}")
print(f"\\nCleaned: {cleaned}")
print(f"\\nTokens: {words[:10]}")
print(f"\\nFiltered: {filtered_words[:10]}")
print(f"\\nStemmed: {stemmed[:10]}")
print(f"\\nLemmatized: {lemmatized[:10]}")
`,
      solution: `import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import re
from collections import Counter

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

text = """
Natural Language Processing (NLP) is amazing! It's revolutionizing how computers 
understand human language. Visit https://nlp.org for more info. #NLP #AI
"""

def clean_text(text):
    text = re.sub(r'http\\S+|www\\S+', '', text)
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    text = text.lower().strip()
    text = re.sub(r'\\s+', ' ', text)
    return text

cleaned = clean_text(text)
words = word_tokenize(cleaned)

stop_words = set(stopwords.words('english'))
filtered_words = [w for w in words if w not in stop_words]

stemmer = PorterStemmer()
stemmed = [stemmer.stem(w) for w in filtered_words]

lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(w) for w in filtered_words]

print(f"Original: {text}")
print(f"\\nCleaned: {cleaned}")
print(f"\\nTokens ({len(words)}): {words}")
print(f"\\nFiltered ({len(filtered_words)}): {filtered_words}")
print(f"\\nStemmed: {stemmed}")
print(f"\\nLemmatized: {lemmatized}")

# Token statistics
word_freq = Counter(filtered_words)
print(f"\\nMost common words: {word_freq.most_common(5)}")
`,
      code: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import re
from collections import Counter

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

text = "Natural Language Processing (NLP) is amazing! It's revolutionizing how computers understand human language."

def clean_text(text):
    text = re.sub(r'http\\S+|www\\S+', '', text)
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    text = text.lower().strip()
    return re.sub(r'\\s+', ' ', text)

cleaned = clean_text(text)
words = word_tokenize(cleaned)
stop_words = set(stopwords.words('english'))
filtered = [w for w in words if w not in stop_words]

stemmer = PorterStemmer()
stemmed = [stemmer.stem(w) for w in filtered]

lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(w) for w in filtered]

print(f"Tokens: {len(words)}")
print(f"Filtered: {len(filtered)}")
print(f"Top words: {Counter(filtered).most_common(3)}")
`
    },
    {
      title: 'Word Embeddings (Word2Vec, GloVe, FastText)',
      description: `
## Word Embeddings

### Overview
Word embeddings represent words as dense vectors in continuous space, capturing semantic relationships. Words with similar meanings have similar vector representations.

### Key Concepts

**Word2Vec**:
- Skip-gram: Predict context from word
- CBOW: Predict word from context
- Captures semantic and syntactic patterns
- Famous example: king - man + woman ≈ queen

**GloVe (Global Vectors)**:
- Matrix factorization on word co-occurrence
- Combines global statistics with local context
- Pre-trained on large corpora (Wikipedia, Common Crawl)

**FastText**:
- Extension of Word2Vec
- Uses subword information (character n-grams)
- Handles out-of-vocabulary words better
- Good for morphologically rich languages

**Applications**:
- Semantic similarity
- Word analogies
- Document classification
- Information retrieval

### Problem Statement
1. Train Word2Vec embeddings on text corpus
2. Find similar words using cosine similarity
3. Perform word arithmetic (analogies)
4. Visualize embeddings in 2D space
5. Compare different embedding methods

### Expected Output
- Trained word vectors
- Similar words for queries
- Word analogy results
- 2D visualization of word relationships
`,
      starterCode: `import numpy as np
from gensim.models import Word2Vec
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Sample corpus
sentences = [
    ['king', 'queen', 'man', 'woman', 'prince', 'princess'],
    ['dog', 'cat', 'animal', 'pet', 'puppy', 'kitten'],
    ['car', 'vehicle', 'drive', 'road', 'highway', 'traffic'],
    ['computer', 'laptop', 'keyboard', 'mouse', 'screen', 'technology'],
    ['food', 'eat', 'restaurant', 'cook', 'meal', 'dinner']
]

# TODO: Train Word2Vec model
model = Word2Vec(
    sentences=,
    vector_size=,  # Embedding dimension
    window=,       # Context window size
    min_count=,    # Minimum word frequency
    workers=4
)

# TODO: Find similar words
word = 'king'
similar = 

print(f"Words similar to '{word}':")
for word, score in similar:
    print(f"  {word}: {score:.3f}")

# TODO: Word arithmetic (analogies)
# king - man + woman = ?
result = model.wv.most_similar(
    positive=[, ],
    negative=[],
    topn=1
)

print(f"\\nWord analogy: king - man + woman = {result[0][0]}")

# TODO: Visualize embeddings
words_to_plot = ['king', 'queen', 'man', 'woman', 'dog', 'cat']
vectors = 

# Reduce to 2D using PCA
pca = PCA(n_components=2)
vectors_2d = 

# Plot
plt.figure(figsize=(10, 8))
plt.scatter(vectors_2d[:, 0], vectors_2d[:, 1])
for i, word in enumerate(words_to_plot):
    plt.annotate(word, (vectors_2d[i, 0], vectors_2d[i, 1]))
plt.title('Word Embeddings Visualization')
plt.show()
`,
      solution: `import numpy as np
from gensim.models import Word2Vec
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

sentences = [
    ['king', 'queen', 'man', 'woman', 'prince', 'princess', 'royal', 'crown'],
    ['dog', 'cat', 'animal', 'pet', 'puppy', 'kitten', 'bark', 'meow'],
    ['car', 'vehicle', 'drive', 'road', 'highway', 'traffic', 'automobile'],
    ['computer', 'laptop', 'keyboard', 'mouse', 'screen', 'technology', 'software'],
    ['food', 'eat', 'restaurant', 'cook', 'meal', 'dinner', 'lunch', 'breakfast'],
    ['happy', 'sad', 'emotion', 'feeling', 'joy', 'sorrow', 'mood'],
    ['run', 'walk', 'jog', 'sprint', 'exercise', 'fitness', 'health']
]

# Train Word2Vec
model = Word2Vec(
    sentences=sentences,
    vector_size=50,
    window=3,
    min_count=1,
    workers=4,
    epochs=100
)

# Find similar words
word = 'king'
similar = model.wv.most_similar(word, topn=5)

print(f"Words similar to '{word}':")
for w, score in similar:
    print(f"  {w}: {score:.3f}")

# Word arithmetic
try:
    result = model.wv.most_similar(
        positive=['king', 'woman'],
        negative=['man'],
        topn=1
    )
    print(f"\\nWord analogy: king - man + woman = {result[0][0]} ({result[0][1]:.3f})")
except:
    print("\\nWord analogy: Not enough training data")

# Visualize embeddings
words_to_plot = ['king', 'queen', 'man', 'woman', 'dog', 'cat', 'happy', 'sad']
vectors = np.array([model.wv[w] for w in words_to_plot if w in model.wv])
valid_words = [w for w in words_to_plot if w in model.wv]

pca = PCA(n_components=2)
vectors_2d = pca.fit_transform(vectors)

plt.figure(figsize=(10, 8))
plt.scatter(vectors_2d[:, 0], vectors_2d[:, 1], s=100, alpha=0.6)
for i, word in enumerate(valid_words):
    plt.annotate(word, (vectors_2d[i, 0], vectors_2d[i, 1]), 
                fontsize=12, fontweight='bold')
plt.title('Word Embeddings Visualization (2D PCA)')
plt.xlabel('PC1')
plt.ylabel('PC2')
plt.grid(True, alpha=0.3)
plt.show()

print(f"\\nVocabulary size: {len(model.wv)}")
print(f"Embedding dimension: {model.wv.vector_size}")
`,
      code: `from gensim.models import Word2Vec
import numpy as np

sentences = [
    ['king', 'queen', 'man', 'woman', 'prince', 'princess'],
    ['dog', 'cat', 'animal', 'pet', 'puppy', 'kitten'],
    ['car', 'vehicle', 'drive', 'road', 'highway'],
    ['computer', 'laptop', 'keyboard', 'mouse', 'screen'],
    ['food', 'eat', 'restaurant', 'cook', 'meal']
]

model = Word2Vec(sentences=sentences, vector_size=50, window=3, min_count=1, epochs=100)

similar = model.wv.most_similar('king', topn=3)
print("Similar to 'king':")
for word, score in similar:
    print(f"  {word}: {score:.3f}")

try:
    result = model.wv.most_similar(positive=['king', 'woman'], negative=['man'], topn=1)
    print(f"\\nking - man + woman = {result[0][0]}")
except:
    print("\\nNeed more training data for analogies")
`
    },
    {
      title: 'Text Classification & Sentiment Analysis',
      description: `
## Text Classification & Sentiment Analysis

### Overview
Text classification assigns predefined categories to text documents. Sentiment analysis is a specific type that determines emotional tone (positive, negative, neutral).

### Key Concepts

**Feature Extraction**:
- Bag of Words (BoW): Count word occurrences
- TF-IDF: Term Frequency-Inverse Document Frequency
- N-grams: Sequences of n words

**Classification Algorithms**:
- Naive Bayes: Probabilistic classifier
- Logistic Regression: Linear model
- SVM: Support Vector Machines
- Deep Learning: LSTM, CNN, Transformers

**Sentiment Analysis**:
- Binary: Positive vs Negative
- Multi-class: Positive, Negative, Neutral
- Fine-grained: 1-5 star ratings
- Aspect-based: Sentiment per aspect

**Applications**:
- Product review analysis
- Social media monitoring
- Customer feedback
- Brand reputation management

### Problem Statement
1. Load and preprocess text dataset
2. Extract TF-IDF features
3. Train sentiment classifier
4. Evaluate model performance
5. Predict sentiment on new text

### Expected Output
- Model accuracy and metrics
- Confusion matrix
- Sentiment predictions with confidence scores
`,
      starterCode: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Sample dataset
texts = [
    "This movie is absolutely amazing! Best film ever!",
    "Terrible experience. Waste of time and money.",
    "Pretty good, enjoyed it overall.",
    "Awful! Worst movie I've ever seen.",
    "Fantastic performance by the actors!",
    "Boring and predictable plot.",
    "Loved every minute of it!",
    "Not worth watching, very disappointing.",
    "Excellent cinematography and direction!",
    "Poor script and bad acting."
]

labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]  # 1=positive, 0=negative

# TODO: Create TF-IDF features
vectorizer = TfidfVectorizer(max_features=100, ngram_range=(1, 2))
X = 

# TODO: Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, labels, test_size=0.3, random_state=42
)

# TODO: Train Naive Bayes classifier
nb_model = MultinomialNB()


# TODO: Train Logistic Regression
lr_model = LogisticRegression(max_iter=1000)


# TODO: Evaluate models
nb_pred = 
lr_pred = 

print("Naive Bayes Results:")
print(classification_report(y_test, nb_pred, target_names=['Negative', 'Positive']))

print("\\nLogistic Regression Results:")
print(classification_report(y_test, lr_pred, target_names=['Negative', 'Positive']))

# TODO: Predict on new text
new_texts = ["This is wonderful!", "I hate this product."]
new_X = 
predictions = 

for text, pred in zip(new_texts, predictions):
    sentiment = "Positive" if pred == 1 else "Negative"
    print(f"\\n'{text}' → {sentiment}")
`,
      solution: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt

texts = [
    "This movie is absolutely amazing! Best film ever!",
    "Terrible experience. Waste of time and money.",
    "Pretty good, enjoyed it overall.",
    "Awful! Worst movie I've ever seen.",
    "Fantastic performance by the actors!",
    "Boring and predictable plot.",
    "Loved every minute of it!",
    "Not worth watching, very disappointing.",
    "Excellent cinematography and direction!",
    "Poor script and bad acting.",
    "Outstanding! Highly recommended!",
    "Complete disaster, avoid at all costs.",
    "Nice story and great visuals.",
    "Dull and uninteresting.",
    "Brilliant masterpiece!",
    "Horrible waste of money."
]

labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]

vectorizer = TfidfVectorizer(max_features=100, ngram_range=(1, 2))
X = vectorizer.fit_transform(texts)

X_train, X_test, y_train, y_test = train_test_split(
    X, labels, test_size=0.3, random_state=42, stratify=labels
)

nb_model = MultinomialNB()
nb_model.fit(X_train, y_train)

lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train, y_train)

nb_pred = nb_model.predict(X_test)
lr_pred = lr_model.predict(X_test)

print("Naive Bayes Results:")
print(f"Accuracy: {accuracy_score(y_test, nb_pred):.3f}")
print(classification_report(y_test, nb_pred, target_names=['Negative', 'Positive']))

print("\\nLogistic Regression Results:")
print(f"Accuracy: {accuracy_score(y_test, lr_pred):.3f}")
print(classification_report(y_test, lr_pred, target_names=['Negative', 'Positive']))

# Confusion matrix
cm = confusion_matrix(y_test, lr_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['Negative', 'Positive'],
            yticklabels=['Negative', 'Positive'])
plt.title('Confusion Matrix - Logistic Regression')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.show()

# Predict on new text
new_texts = ["This is wonderful!", "I hate this product.", "It's okay, nothing special."]
new_X = vectorizer.transform(new_texts)
predictions = lr_model.predict(new_X)
probabilities = lr_model.predict_proba(new_X)

print("\\nPredictions on new text:")
for text, pred, prob in zip(new_texts, predictions, probabilities):
    sentiment = "Positive" if pred == 1 else "Negative"
    confidence = prob[pred]
    print(f"'{text}'")
    print(f"  → {sentiment} (confidence: {confidence:.3f})")
`,
      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

texts = [
    "This movie is amazing!", "Terrible waste of time.",
    "Pretty good overall.", "Awful experience.",
    "Fantastic performance!", "Boring plot.",
    "Loved it!", "Very disappointing.",
    "Excellent direction!", "Poor acting.",
    "Outstanding!", "Complete disaster.",
    "Great visuals.", "Dull story.",
    "Brilliant!", "Horrible."
]
labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]

vectorizer = TfidfVectorizer(max_features=100)
X = vectorizer.fit_transform(texts)
X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.3, random_state=42)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

print(f"Accuracy: {accuracy_score(y_test, model.predict(X_test)):.3f}")

new_texts = ["This is wonderful!", "I hate this."]
predictions = model.predict(vectorizer.transform(new_texts))
for text, pred in zip(new_texts, predictions):
    print(f"'{text}' → {'Positive' if pred == 1 else 'Negative'}")
`
    },
    {
      title: 'Named Entity Recognition (NER)',
      description: `
## Named Entity Recognition

### Overview
NER identifies and classifies named entities in text into predefined categories such as person names, organizations, locations, dates, and more.

### Key Concepts

**Entity Types**:
- PERSON: People names
- ORG: Organizations, companies
- GPE: Geopolitical entities (countries, cities)
- DATE: Dates and time expressions
- MONEY: Monetary values
- PRODUCT: Product names

**NER Approaches**:
- Rule-based: Pattern matching, gazetteers
- Statistical: CRF, HMM
- Deep Learning: BiLSTM-CRF, Transformers
- Pre-trained: spaCy, BERT-based models

**Applications**:
- Information extraction
- Question answering
- Content recommendation
- Knowledge graph construction
- Resume parsing

### Problem Statement
1. Load pre-trained NER model (spaCy)
2. Extract entities from text
3. Visualize entities with labels
4. Analyze entity distributions
5. Build custom NER for domain-specific entities

### Expected Output
- Extracted entities with types
- Entity frequency analysis
- Visualized entity annotations
`,
      starterCode: `import spacy
from collections import Counter

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Sample text
text = """
Apple Inc. was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976.
The company is headquartered in Cupertino, California. In 2023, Apple reported 
revenue of $394.3 billion. Tim Cook became CEO in August 2011.
"""

# TODO: Process text with spaCy
doc = 

# TODO: Extract entities
entities = []
for ent in doc.ents:
    entities.append({
        'text': ,
        'label': ,
        'start': ,
        'end': 
    })

# TODO: Print entities
print("Extracted Entities:")
for ent in entities:
    print(f"  {ent['text']:20} → {ent['label']}")

# TODO: Count entity types
entity_types = 
print(f"\\nEntity Type Distribution:")
for ent_type, count in entity_types.most_common():
    print(f"  {ent_type}: {count}")

# TODO: Visualize entities (text-based)
print(f"\\nAnnotated Text:")
print(text)
print("\\nEntities:")
for ent in doc.ents:
    print(f"  [{ent.start_char}:{ent.end_char}] {ent.text} ({ent.label_})")
`,
      solution: `import spacy
from collections import Counter
from spacy import displacy

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    print("Downloading spaCy model...")
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

text = """
Apple Inc. was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976.
The company is headquartered in Cupertino, California. In 2023, Apple reported 
revenue of $394.3 billion. Tim Cook became CEO in August 2011. Microsoft and Google 
are major competitors in the technology sector.
"""

doc = nlp(text)

entities = []
for ent in doc.ents:
    entities.append({
        'text': ent.text,
        'label': ent.label_,
        'start': ent.start_char,
        'end': ent.end_char
    })

print("Extracted Entities:")
print("-" * 50)
for ent in entities:
    print(f"  {ent['text']:25} → {ent['label']}")

entity_types = Counter([ent['label'] for ent in entities])
print(f"\\nEntity Type Distribution:")
print("-" * 50)
for ent_type, count in entity_types.most_common():
    print(f"  {ent_type:15} : {count}")

# Group entities by type
entities_by_type = {}
for ent in doc.ents:
    if ent.label_ not in entities_by_type:
        entities_by_type[ent.label_] = []
    entities_by_type[ent.label_].append(ent.text)

print(f"\\nEntities Grouped by Type:")
print("-" * 50)
for ent_type, ent_list in entities_by_type.items():
    print(f"\\n{ent_type}:")
    for ent in set(ent_list):
        print(f"  - {ent}")

# Entity explanations
print(f"\\nEntity Type Explanations:")
print("-" * 50)
labels = {
    "ORG": "Organizations, companies, agencies",
    "PERSON": "People, including fictional",
    "GPE": "Countries, cities, states",
    "DATE": "Absolute or relative dates or periods",
    "MONEY": "Monetary values, including unit",
    "CARDINAL": "Numerals that do not fall under another type"
}
for label, explanation in labels.items():
    if label in entity_types:
        print(f"  {label}: {explanation}")
`,
      code: `import spacy
from collections import Counter

try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

text = "Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976. Tim Cook is the current CEO."

doc = nlp(text)

print("Entities:")
for ent in doc.ents:
    print(f"  {ent.text:20} → {ent.label_}")

entity_types = Counter([ent.label_ for ent in doc.ents])
print(f"\\nEntity counts: {dict(entity_types)}")
`
    },
    {
      title: 'Sequence-to-Sequence Models',
      description: `
## Sequence-to-Sequence Models

### Overview
Seq2Seq models transform one sequence into another, enabling tasks like machine translation, text summarization, and dialogue generation.

### Key Concepts

**Architecture**:
- Encoder: Processes input sequence into context vector
- Decoder: Generates output sequence from context
- Both typically use RNNs, LSTMs, or GRUs

**Encoder-Decoder**:
- Encoder compresses input into fixed-size vector
- Decoder expands vector into output sequence
- Information bottleneck in vanilla seq2seq

**Teacher Forcing**:
- Training technique
- Use ground truth as decoder input
- Speeds up training but can cause exposure bias

**Applications**:
- Machine translation
- Text summarization
- Dialogue systems
- Code generation
- Image captioning

### Problem Statement
1. Build encoder-decoder architecture
2. Implement sequence-to-sequence model
3. Train on simple translation task
4. Generate predictions with beam search
5. Evaluate translation quality

### Expected Output
- Trained seq2seq model
- Translation examples
- Attention weights visualization
`,
      starterCode: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Simple dataset: number sequences to words
input_texts = ['123', '456', '789', '321', '654']
target_texts = ['one two three', 'four five six', 'seven eight nine', 
                'three two one', 'six five four']

# TODO: Create character-level vocabulary
input_chars = set()
target_chars = set()

for text in input_texts:
    for char in text:
        input_chars.add(char)

for text in target_texts:
    for char in text:
        target_chars.add(char)

input_chars = sorted(list(input_chars))
target_chars = sorted(list(target_chars))

# TODO: Create character mappings
input_char_to_idx = 
target_char_to_idx = 

# TODO: Prepare training data
encoder_input_data = np.zeros(
    (len(input_texts), max_encoder_len, len(input_chars)),
    dtype='float32'
)

decoder_input_data = np.zeros(
    (len(target_texts), max_decoder_len, len(target_chars)),
    dtype='float32'
)

decoder_target_data = np.zeros(
    (len(target_texts), max_decoder_len, len(target_chars)),
    dtype='float32'
)

# TODO: Build encoder
encoder_inputs = keras.Input(shape=(None, len(input_chars)))
encoder_lstm = layers.LSTM(, return_state=True)
encoder_outputs, state_h, state_c = 
encoder_states = [state_h, state_c]

# TODO: Build decoder
decoder_inputs = keras.Input(shape=(None, len(target_chars)))
decoder_lstm = layers.LSTM(, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_inputs, initial_state=encoder_states)
decoder_dense = layers.Dense(len(target_chars), activation='softmax')
decoder_outputs = 

# TODO: Create and compile model
model = keras.Model([encoder_inputs, decoder_inputs], decoder_outputs)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

print("Seq2Seq model created")
print(f"Encoder input shape: {encoder_inputs.shape}")
print(f"Decoder input shape: {decoder_inputs.shape}")
`,
      solution: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

input_texts = ['123', '456', '789', '321', '654', '987', '147', '258']
target_texts = ['one two three', 'four five six', 'seven eight nine', 
                'three two one', 'six five four', 'nine eight seven',
                'one four seven', 'two five eight']

input_chars = sorted(list(set(''.join(input_texts))))
target_chars = sorted(list(set(''.join(target_texts) + '\\t\\n')))

input_char_to_idx = {char: i for i, char in enumerate(input_chars)}
target_char_to_idx = {char: i for i, char in enumerate(target_chars)}

max_encoder_len = max([len(txt) for txt in input_texts])
max_decoder_len = max([len(txt) for txt in target_texts])

encoder_input_data = np.zeros(
    (len(input_texts), max_encoder_len, len(input_chars)), dtype='float32'
)
decoder_input_data = np.zeros(
    (len(target_texts), max_decoder_len, len(target_chars)), dtype='float32'
)
decoder_target_data = np.zeros(
    (len(target_texts), max_decoder_len, len(target_chars)), dtype='float32'
)

for i, (input_text, target_text) in enumerate(zip(input_texts, target_texts)):
    for t, char in enumerate(input_text):
        encoder_input_data[i, t, input_char_to_idx[char]] = 1.0
    
    for t, char in enumerate('\\t' + target_text):
        decoder_input_data[i, t, target_char_to_idx[char]] = 1.0
        if t > 0:
            decoder_target_data[i, t - 1, target_char_to_idx[char]] = 1.0

latent_dim = 64

encoder_inputs = keras.Input(shape=(None, len(input_chars)))
encoder_lstm = layers.LSTM(latent_dim, return_state=True)
encoder_outputs, state_h, state_c = encoder_lstm(encoder_inputs)
encoder_states = [state_h, state_c]

decoder_inputs = keras.Input(shape=(None, len(target_chars)))
decoder_lstm = layers.LSTM(latent_dim, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_inputs, initial_state=encoder_states)
decoder_dense = layers.Dense(len(target_chars), activation='softmax')
decoder_outputs = decoder_dense(decoder_outputs)

model = keras.Model([encoder_inputs, decoder_inputs], decoder_outputs)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

print("Training Seq2Seq model...")
history = model.fit(
    [encoder_input_data, decoder_input_data],
    decoder_target_data,
    batch_size=2,
    epochs=50,
    validation_split=0.2,
    verbose=0
)

print(f"\\nFinal training accuracy: {history.history['accuracy'][-1]:.3f}")
print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.3f}")
print(f"\\nModel architecture:")
print(f"  Encoder: LSTM({latent_dim})")
print(f"  Decoder: LSTM({latent_dim}) + Dense({len(target_chars)})")
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

input_texts = ['123', '456', '789']
target_texts = ['one two three', 'four five six', 'seven eight nine']

input_chars = sorted(set(''.join(input_texts)))
target_chars = sorted(set(''.join(target_texts) + '\\t\\n'))

input_char_to_idx = {c: i for i, c in enumerate(input_chars)}
target_char_to_idx = {c: i for i, c in enumerate(target_chars)}

max_enc_len = max(len(t) for t in input_texts)
max_dec_len = max(len(t) for t in target_texts)

enc_input = np.zeros((len(input_texts), max_enc_len, len(input_chars)), dtype='float32')
dec_input = np.zeros((len(target_texts), max_dec_len, len(target_chars)), dtype='float32')
dec_target = np.zeros((len(target_texts), max_dec_len, len(target_chars)), dtype='float32')

for i, (inp, tgt) in enumerate(zip(input_texts, target_texts)):
    for t, c in enumerate(inp):
        enc_input[i, t, input_char_to_idx[c]] = 1.0
    for t, c in enumerate('\\t' + tgt):
        dec_input[i, t, target_char_to_idx[c]] = 1.0
        if t > 0:
            dec_target[i, t-1, target_char_to_idx[c]] = 1.0

latent_dim = 64
enc_inputs = keras.Input(shape=(None, len(input_chars)))
enc_lstm = layers.LSTM(latent_dim, return_state=True)
_, state_h, state_c = enc_lstm(enc_inputs)

dec_inputs = keras.Input(shape=(None, len(target_chars)))
dec_lstm = layers.LSTM(latent_dim, return_sequences=True, return_state=True)
dec_outputs, _, _ = dec_lstm(dec_inputs, initial_state=[state_h, state_c])
dec_outputs = layers.Dense(len(target_chars), activation='softmax')(dec_outputs)

model = keras.Model([enc_inputs, dec_inputs], dec_outputs)
model.compile(optimizer='adam', loss='categorical_crossentropy')
model.fit([enc_input, dec_input], dec_target, epochs=50, verbose=0)
print("Seq2Seq model trained")
`
    },
    {
      title: 'Attention Mechanisms for NLP',
      description: `
## Attention Mechanisms

### Overview
Attention allows models to focus on relevant parts of input when generating output, solving the information bottleneck problem in vanilla seq2seq models.

### Key Concepts

**Attention Mechanism**:
- Computes alignment scores between encoder and decoder states
- Creates weighted context vector
- Allows decoder to "attend" to different input positions

**Attention Types**:
- Additive (Bahdanau): Concatenate and feed through network
- Multiplicative (Luong): Dot product of states
- Self-attention: Attention within same sequence

**Attention Weights**:
- Softmax over alignment scores
- Interpretable: shows which inputs are important
- Visualizable as heatmaps

**Benefits**:
- Better long-sequence handling
- Interpretability
- Foundation for Transformers

### Problem Statement
1. Implement attention mechanism
2. Visualize attention weights
3. Compare with/without attention
4. Analyze attention patterns

### Expected Output
- Attention-enhanced model
- Attention weight visualizations
- Performance comparison
`,
      starterCode: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt

# Attention layer
class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super(AttentionLayer, self).__init__()
        self.W1 = layers.Dense(units)
        self.W2 = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        # TODO: Compute attention scores
        # query: decoder hidden state
        # values: encoder outputs
        
        # Expand query to match values shape
        query_with_time = 
        
        # Compute score
        score = 
        
        # Attention weights
        attention_weights = 
        
        # Context vector
        context_vector = 
        
        return context_vector, attention_weights

# Build model with attention
latent_dim = 64
vocab_size = 100

# Encoder
encoder_inputs = keras.Input(shape=(None,))
encoder_embedding = layers.Embedding(vocab_size, latent_dim)(encoder_inputs)
encoder_outputs, state_h, state_c = layers.LSTM(latent_dim, return_sequences=True, return_state=True)(encoder_embedding)

# Decoder with attention
decoder_inputs = keras.Input(shape=(None,))
decoder_embedding = layers.Embedding(vocab_size, latent_dim)(decoder_inputs)
decoder_lstm = layers.LSTM(latent_dim, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_embedding, initial_state=[state_h, state_c])

# TODO: Apply attention
attention_layer = AttentionLayer(latent_dim)
context_vector, attention_weights = 

# TODO: Combine context and decoder output
decoder_combined = 

# Output layer
output = layers.Dense(vocab_size, activation='softmax')(decoder_combined)

model = keras.Model([encoder_inputs, decoder_inputs], output)
print("Attention model created")
`,
      solution: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super(AttentionLayer, self).__init__()
        self.W1 = layers.Dense(units)
        self.W2 = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        query_with_time = tf.expand_dims(query, 1)
        score = self.V(tf.nn.tanh(self.W1(query_with_time) + self.W2(values)))
        attention_weights = tf.nn.softmax(score, axis=1)
        context_vector = attention_weights * values
        context_vector = tf.reduce_sum(context_vector, axis=1)
        return context_vector, attention_weights

latent_dim = 64
vocab_size = 100

encoder_inputs = keras.Input(shape=(None,))
encoder_embedding = layers.Embedding(vocab_size, latent_dim)(encoder_inputs)
encoder_outputs, state_h, state_c = layers.LSTM(latent_dim, return_sequences=True, return_state=True)(encoder_embedding)

decoder_inputs = keras.Input(shape=(None,))
decoder_embedding = layers.Embedding(vocab_size, latent_dim)(decoder_inputs)
decoder_lstm = layers.LSTM(latent_dim, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_embedding, initial_state=[state_h, state_c])

attention_layer = AttentionLayer(latent_dim)
context_vector, attention_weights = attention_layer(decoder_outputs[:, 0, :], encoder_outputs)

decoder_combined = layers.Concatenate()([context_vector, decoder_outputs[:, 0, :]])
output = layers.Dense(vocab_size, activation='softmax')(decoder_combined)

model = keras.Model([encoder_inputs, decoder_inputs], output)
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')

print("Attention-based Seq2Seq model created")
print(f"Encoder: Embedding({vocab_size}, {latent_dim}) + LSTM({latent_dim})")
print(f"Decoder: Embedding({vocab_size}, {latent_dim}) + LSTM({latent_dim}) + Attention")
print(f"Output: Dense({vocab_size})")
`,
      code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

class AttentionLayer(layers.Layer):
    def __init__(self, units):
        super().__init__()
        self.W1 = layers.Dense(units)
        self.W2 = layers.Dense(units)
        self.V = layers.Dense(1)
    
    def call(self, query, values):
        query_time = tf.expand_dims(query, 1)
        score = self.V(tf.nn.tanh(self.W1(query_time) + self.W2(values)))
        attn_weights = tf.nn.softmax(score, axis=1)
        context = tf.reduce_sum(attn_weights * values, axis=1)
        return context, attn_weights

latent_dim = 64
vocab_size = 100

enc_in = keras.Input(shape=(None,))
enc_emb = layers.Embedding(vocab_size, latent_dim)(enc_in)
enc_out, h, c = layers.LSTM(latent_dim, return_sequences=True, return_state=True)(enc_emb)

dec_in = keras.Input(shape=(None,))
dec_emb = layers.Embedding(vocab_size, latent_dim)(dec_in)
dec_out, _, _ = layers.LSTM(latent_dim, return_sequences=True, return_state=True)(dec_emb, initial_state=[h, c])

attn = AttentionLayer(latent_dim)
context, _ = attn(dec_out[:, 0, :], enc_out)

combined = layers.Concatenate()([context, dec_out[:, 0, :]])
output = layers.Dense(vocab_size, activation='softmax')(combined)

model = keras.Model([enc_in, dec_in], output)
print("Attention model created")
`
    },
    {
      title: 'BERT and Transformer Models',
      description: `
## BERT and Transformers

### Overview
BERT (Bidirectional Encoder Representations from Transformers) revolutionized NLP by using bidirectional context and pre-training on massive text corpora.

### Key Concepts

**Transformer Architecture**:
- Self-attention mechanism
- No recurrence (parallel processing)
- Positional encodings
- Multi-head attention

**BERT Pre-training**:
- Masked Language Modeling (MLM)
- Next Sentence Prediction (NSP)
- Trained on BooksCorpus + Wikipedia

**BERT Variants**:
- RoBERTa: Optimized training
- ALBERT: Parameter sharing
- DistilBERT: Smaller, faster
- ELECTRA: Discriminative pre-training

**Fine-tuning**:
- Add task-specific layer
- Train on downstream task
- Transfer learning from pre-trained weights

### Problem Statement
1. Load pre-trained BERT model
2. Fine-tune for text classification
3. Extract contextual embeddings
4. Analyze attention patterns
5. Compare with traditional methods

### Expected Output
- Fine-tuned BERT classifier
- Classification accuracy
- Attention visualizations
`,
      starterCode: `from transformers import BertTokenizer, TFBertForSequenceClassification
from transformers import InputExample, InputFeatures
import tensorflow as tf
import numpy as np

# Load pre-trained BERT
model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = TFBertForSequenceClassification.from_pretrained(model_name, num_labels=2)

# Sample data
texts = [
    "This product is amazing!",
    "Terrible quality, very disappointed.",
    "Excellent service and fast delivery!",
    "Waste of money, do not buy."
]
labels = [1, 0, 1, 0]  # 1=positive, 0=negative

# TODO: Tokenize texts
encodings = tokenizer(
    texts,
    truncation=,
    padding=,
    max_length=,
    return_tensors='tf'
)

# TODO: Prepare dataset
dataset = tf.data.Dataset.from_tensor_slices((
    dict(encodings),
    labels
))

# TODO: Compile model
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)

# TODO: Train model
history = model.fit(
    dataset.batch(),
    epochs=,
    verbose=1
)

# TODO: Predict on new text
new_text = ["This is wonderful!"]
new_encoding = 
predictions = 

print(f"\\nPrediction: {predictions}")
`,
      solution: `from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf
import numpy as np

model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = TFBertForSequenceClassification.from_pretrained(model_name, num_labels=2)

texts = [
    "This product is amazing! Best purchase ever!",
    "Terrible quality, very disappointed. Waste of money.",
    "Excellent service and fast delivery! Highly recommend!",
    "Do not buy this. Complete disaster.",
    "Love it! Exactly what I needed.",
    "Poor quality. Broke after one use.",
    "Outstanding! Five stars!",
    "Horrible experience. Never again."
]
labels = [1, 0, 1, 0, 1, 0, 1, 0]

encodings = tokenizer(
    texts,
    truncation=True,
    padding=True,
    max_length=128,
    return_tensors='tf'
)

dataset = tf.data.Dataset.from_tensor_slices((
    dict(encodings),
    labels
)).batch(2)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=2e-5),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)

print("Fine-tuning BERT...")
history = model.fit(dataset, epochs=3, verbose=1)

new_texts = ["This is wonderful!", "I hate this product."]
new_encodings = tokenizer(new_texts, truncation=True, padding=True, max_length=128, return_tensors='tf')
predictions = model.predict(dict(new_encodings))

logits = predictions.logits
predicted_classes = tf.argmax(logits, axis=1).numpy()

print("\\nPredictions:")
for text, pred in zip(new_texts, predicted_classes):
    sentiment = "Positive" if pred == 1 else "Negative"
    print(f"  '{text}' → {sentiment}")

print(f"\\nModel: {model_name}")
print(f"Parameters: ~110M")
print(f"Max sequence length: 128 tokens")
`,
      code: `from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

texts = ["Amazing product!", "Terrible quality.", "Love it!", "Waste of money."]
labels = [1, 0, 1, 0]

encodings = tokenizer(texts, truncation=True, padding=True, max_length=128, return_tensors='tf')
dataset = tf.data.Dataset.from_tensor_slices((dict(encodings), labels)).batch(2)

model.compile(optimizer=tf.keras.optimizers.Adam(2e-5),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

model.fit(dataset, epochs=3, verbose=0)

new_text = ["This is wonderful!"]
new_enc = tokenizer(new_text, truncation=True, padding=True, max_length=128, return_tensors='tf')
pred = tf.argmax(model.predict(dict(new_enc)).logits, axis=1).numpy()[0]
print(f"Prediction: {'Positive' if pred == 1 else 'Negative'}")
`
    },
    {
      title: 'Text Generation with GPT',
      description: `
## Text Generation with GPT

### Overview
GPT (Generative Pre-trained Transformer) models are autoregressive language models that generate coherent text by predicting the next token given previous context.

### Key Concepts

**Autoregressive Generation**:
- Predict next token given previous tokens
- Left-to-right context only
- Sampling strategies: greedy, beam search, top-k, nucleus

**GPT Architecture**:
- Decoder-only Transformer
- Causal (masked) self-attention
- Pre-trained on massive text corpora

**Generation Strategies**:
- Greedy: Always pick highest probability
- Beam Search: Keep top-k sequences
- Top-k Sampling: Sample from top k tokens
- Nucleus (top-p): Sample from cumulative probability p

**Applications**:
- Story generation
- Code completion
- Dialogue systems
- Content creation

### Problem Statement
1. Load pre-trained GPT model
2. Generate text with different strategies
3. Control generation with prompts
4. Fine-tune for specific domain
5. Evaluate generation quality

### Expected Output
- Generated text samples
- Comparison of generation strategies
- Perplexity scores
`,
      starterCode: `from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

# Load pre-trained GPT-2
model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Set padding token
tokenizer.pad_token = tokenizer.eos_token

# Prompt
prompt = "Once upon a time in a distant galaxy"

# TODO: Tokenize prompt
input_ids = tokenizer.encode(prompt, return_tensors='pt')

# TODO: Generate with greedy decoding
greedy_output = model.generate(
    input_ids,
    max_length=,
    num_beams=,
    early_stopping=True
)

# TODO: Generate with sampling
sample_output = model.generate(
    input_ids,
    max_length=,
    do_sample=True,
    top_k=,
    top_p=,
    temperature=
)

# TODO: Decode outputs
greedy_text = 
sample_text = 

print(f"Prompt: {prompt}")
print(f"\\nGreedy: {greedy_text}")
print(f"\\nSampling: {sample_text}")
`,
      solution: `from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

tokenizer.pad_token = tokenizer.eos_token

prompts = [
    "Once upon a time in a distant galaxy",
    "The future of artificial intelligence is",
    "In the year 2050, technology will"
]

print("Text Generation with GPT-2\\n" + "="*50)

for prompt in prompts:
    input_ids = tokenizer.encode(prompt, return_tensors='pt')
    
    # Greedy decoding
    greedy_output = model.generate(
        input_ids,
        max_length=50,
        num_beams=1,
        early_stopping=True,
        pad_token_id=tokenizer.eos_token_id
    )
    
    # Sampling with top-k and top-p
    sample_output = model.generate(
        input_ids,
        max_length=50,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.8,
        pad_token_id=tokenizer.eos_token_id
    )
    
    greedy_text = tokenizer.decode(greedy_output[0], skip_special_tokens=True)
    sample_text = tokenizer.decode(sample_output[0], skip_special_tokens=True)
    
    print(f"\\nPrompt: {prompt}")
    print(f"Greedy: {greedy_text}")
    print(f"Sampling: {sample_text}")
    print("-" * 50)

print("\\nGeneration Parameters:")
print("  Greedy: deterministic, picks highest probability")
print("  Sampling: top_k=50, top_p=0.95, temperature=0.8")
print("  Max length: 50 tokens")
`,
      code: `from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer.pad_token = tokenizer.eos_token

prompt = "Once upon a time"
input_ids = tokenizer.encode(prompt, return_tensors='pt')

greedy = model.generate(input_ids, max_length=30, pad_token_id=tokenizer.eos_token_id)
sample = model.generate(input_ids, max_length=30, do_sample=True, top_k=50, 
                        top_p=0.95, temperature=0.8, pad_token_id=tokenizer.eos_token_id)

print(f"Prompt: {prompt}")
print(f"Greedy: {tokenizer.decode(greedy[0], skip_special_tokens=True)}")
print(f"Sample: {tokenizer.decode(sample[0], skip_special_tokens=True)}")
`
    },
    {
      title: 'Machine Translation',
      description: `
## Machine Translation

### Overview
Machine translation automatically translates text from one language to another using neural networks, particularly sequence-to-sequence models with attention.

### Key Concepts

**Neural Machine Translation (NMT)**:
- Encoder-decoder with attention
- End-to-end learning
- No need for linguistic rules

**Translation Quality**:
- BLEU score: Precision of n-grams
- METEOR: Considers synonyms
- Human evaluation: Fluency and adequacy

**Challenges**:
- Rare words and OOV (out-of-vocabulary)
- Long-distance dependencies
- Idiomatic expressions
- Low-resource languages

**Modern Approaches**:
- Transformer-based (MarianMT, mBART)
- Multilingual models
- Zero-shot translation

### Problem Statement
1. Load pre-trained translation model
2. Translate sentences between languages
3. Evaluate translation quality
4. Handle multiple languages
5. Fine-tune for domain-specific translation

### Expected Output
- Translated text
- BLEU scores
- Comparison of different models
`,
      starterCode: `from transformers import MarianMTModel, MarianTokenizer
from sacrebleu import corpus_bleu

# Load translation model (English to French)
model_name = 'Helsinki-NLP/opus-mt-en-fr'
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

# Sample sentences
english_texts = [
    "Hello, how are you?",
    "Machine learning is fascinating.",
    "I love natural language processing."
]

# TODO: Tokenize input
inputs = tokenizer(
    english_texts,
    return_tensors="pt",
    padding=True,
    truncation=True
)

# TODO: Generate translations
translated = model.generate(**inputs)

# TODO: Decode translations
french_texts = 

print("English → French Translation\\n" + "="*50)
for eng, fr in zip(english_texts, french_texts):
    print(f"EN: {eng}")
    print(f"FR: {fr}\\n")

# TODO: Calculate BLEU score (if reference translations available)
references = [
    ["Bonjour, comment allez-vous?"],
    ["L'apprentissage automatique est fascinant."],
    ["J'adore le traitement du langage naturel."]
]

bleu = 

print(f"BLEU Score: {bleu.score:.2f}")
`,
      solution: `from transformers import MarianMTModel, MarianTokenizer

model_name = 'Helsinki-NLP/opus-mt-en-fr'
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

english_texts = [
    "Hello, how are you?",
    "Machine learning is fascinating.",
    "I love natural language processing.",
    "The weather is beautiful today.",
    "Artificial intelligence is transforming the world."
]

inputs = tokenizer(english_texts, return_tensors="pt", padding=True, truncation=True)
translated = model.generate(**inputs, max_length=128)
french_texts = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]

print("English → French Translation\\n" + "="*60)
for eng, fr in zip(english_texts, french_texts):
    print(f"EN: {eng}")
    print(f"FR: {fr}\\n")

# Try reverse translation (French to English)
print("\\nReverse Translation (FR → EN)\\n" + "="*60)
reverse_model_name = 'Helsinki-NLP/opus-mt-fr-en'
reverse_tokenizer = MarianTokenizer.from_pretrained(reverse_model_name)
reverse_model = MarianMTModel.from_pretrained(reverse_model_name)

reverse_inputs = reverse_tokenizer(french_texts, return_tensors="pt", padding=True, truncation=True)
back_translated = reverse_model.generate(**reverse_inputs, max_length=128)
back_english = [reverse_tokenizer.decode(t, skip_special_tokens=True) for t in back_translated]

for orig, back in zip(english_texts, back_english):
    print(f"Original: {orig}")
    print(f"Back-translated: {back}\\n")

print("Model: MarianMT (Helsinki-NLP)")
print("Languages: English ↔ French")
print("Based on: Transformer architecture")
`,
      code: `from transformers import MarianMTModel, MarianTokenizer

model_name = 'Helsinki-NLP/opus-mt-en-fr'
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

texts = ["Hello, how are you?", "Machine learning is fascinating."]
inputs = tokenizer(texts, return_tensors="pt", padding=True)
translated = model.generate(**inputs)
french = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]

print("EN → FR:")
for en, fr in zip(texts, french):
    print(f"  {en} → {fr}")
`
    },
    {
      title: 'Chatbots & Question Answering',
      description: `
## Chatbots & Question Answering

### Overview
Conversational AI systems that can understand questions and provide relevant answers, ranging from rule-based systems to sophisticated neural models.

### Key Concepts

**Chatbot Types**:
- Rule-based: Pattern matching, decision trees
- Retrieval-based: Select from predefined responses
- Generative: Generate responses dynamically
- Hybrid: Combination of approaches

**Question Answering**:
- Extractive QA: Extract answer from context
- Abstractive QA: Generate answer
- Open-domain: Answer from large corpus
- Closed-domain: Specific knowledge base

**Key Components**:
- Intent classification
- Entity extraction
- Dialogue management
- Response generation

**Modern Approaches**:
- BERT for QA (SQuAD dataset)
- GPT for dialogue
- Retrieval-augmented generation (RAG)

### Problem Statement
1. Build extractive QA system with BERT
2. Create rule-based chatbot
3. Implement retrieval-based responses
4. Evaluate answer quality
5. Handle multi-turn conversations

### Expected Output
- Question answering system
- Chatbot responses
- Confidence scores
- Conversation flow
`,
      starterCode: `from transformers import pipeline
import re

# Load QA pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Context
context = """
Natural Language Processing (NLP) is a field of artificial intelligence that focuses on 
the interaction between computers and humans through natural language. The ultimate goal 
of NLP is to enable computers to understand, interpret, and generate human language in a 
valuable way. Common NLP tasks include sentiment analysis, machine translation, named 
entity recognition, and question answering.
"""

# TODO: Ask questions
questions = [
    "What is NLP?",
    "What is the goal of NLP?",
    "What are common NLP tasks?"
]

print("Question Answering System\\n" + "="*60)
for question in questions:
    result = qa_pipeline(question=question, context=context)
    print(f"Q: {question}")
    print(f"A: {result['answer']}")
    print(f"Confidence: {result['score']:.3f}\\n")

# TODO: Build simple rule-based chatbot
class SimpleChatbot:
    def __init__(self):
        self.patterns = {
            r'hello|hi|hey': "Hello! How can I help you?",
            r'how are you': "I'm doing well, thank you!",
            r'what is your name': "I'm a simple chatbot.",
            r'bye|goodbye': "Goodbye! Have a great day!",
            r'help': "I can answer questions about NLP. Just ask!"
        }
    
    def respond(self, message):
        message = message.lower()
        for pattern, response in self.patterns.items():
            if re.search(pattern, message):
                return response
        return "I'm not sure how to respond to that."

# TODO: Test chatbot
chatbot = SimpleChatbot()
test_messages = ["Hello!", "What is your name?", "Help me", "Goodbye"]

print("\\nSimple Chatbot\\n" + "="*60)
for msg in test_messages:
    response = chatbot.respond(msg)
    print(f"User: {msg}")
    print(f"Bot: {response}\\n")
`,
      solution: `from transformers import pipeline
import re

qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

context = """
Natural Language Processing (NLP) is a field of artificial intelligence that focuses on 
the interaction between computers and humans through natural language. The ultimate goal 
of NLP is to enable computers to understand, interpret, and generate human language in a 
valuable way. Common NLP tasks include sentiment analysis, machine translation, named 
entity recognition, question answering, and text summarization. NLP combines computational 
linguistics with machine learning and deep learning techniques.
"""

questions = [
    "What is NLP?",
    "What is the goal of NLP?",
    "What are common NLP tasks?",
    "What does NLP combine?"
]

print("Question Answering System\\n" + "="*70)
for question in questions:
    result = qa_pipeline(question=question, context=context)
    print(f"Q: {question}")
    print(f"A: {result['answer']}")
    print(f"Confidence: {result['score']:.3f}")
    print(f"Position: [{result['start']}:{result['end']}]\\n")

class SimpleChatbot:
    def __init__(self):
        self.patterns = {
            r'hello|hi|hey': "Hello! How can I help you today?",
            r'how are you': "I'm doing well, thank you for asking!",
            r'what is your name': "I'm a simple NLP chatbot.",
            r'bye|goodbye': "Goodbye! Have a great day!",
            r'help': "I can answer questions about NLP. Just ask!",
            r'thank': "You're welcome!",
            r'what can you do': "I can answer questions and have simple conversations.",
            r'nlp|natural language': "NLP is about teaching computers to understand human language!"
        }
    
    def respond(self, message):
        message = message.lower()
        for pattern, response in self.patterns.items():
            if re.search(pattern, message):
                return response
        return "I'm not sure how to respond to that. Try asking about NLP or saying hello!"

chatbot = SimpleChatbot()
test_messages = [
    "Hello!",
    "What is your name?",
    "What can you do?",
    "Tell me about NLP",
    "Thank you",
    "Goodbye"
]

print("\\nSimple Rule-Based Chatbot\\n" + "="*70)
for msg in test_messages:
    response = chatbot.respond(msg)
    print(f"User: {msg}")
    print(f"Bot:  {response}\\n")

print("Chatbot Type: Rule-based with regex patterns")
print("QA Model: DistilBERT fine-tuned on SQuAD")
`,
      code: `from transformers import pipeline
import re

qa = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

context = "NLP is a field of AI that focuses on interaction between computers and humans through natural language."

questions = ["What is NLP?", "What does NLP focus on?"]

print("Question Answering:")
for q in questions:
    result = qa(question=q, context=context)
    print(f"Q: {q}")
    print(f"A: {result['answer']} (confidence: {result['score']:.3f})\\n")

class Chatbot:
    def __init__(self):
        self.patterns = {
            r'hello|hi': "Hello! How can I help?",
            r'bye': "Goodbye!",
            r'help': "I can answer questions about NLP."
        }
    
    def respond(self, msg):
        msg = msg.lower()
        for pattern, response in self.patterns.items():
            if re.search(pattern, msg):
                return response
        return "I'm not sure how to respond."

bot = Chatbot()
for msg in ["Hello!", "Help me", "Bye"]:
    print(f"User: {msg}\\nBot: {bot.respond(msg)}\\n")
`
    },
    {
      title: 'Topic Modeling (LDA)',
      description: `
## Topic Modeling with LDA

### Overview
Topic modeling discovers abstract "topics" in a collection of documents. Latent Dirichlet Allocation (LDA) is the most popular approach, treating each document as a mixture of topics and each topic as a mixture of words.

### Key Concepts

**LDA Intuition**:
- Each document is about several topics
- Each topic is characterized by certain words
- LDA discovers these topics automatically

**How LDA Works**:
1. Choose number of topics (K)
2. Randomly assign each word to a topic
3. Iteratively update assignments based on:
   - How common the topic is in the document
   - How common the word is in the topic
4. Converge to stable topic assignments

**Document-Topic Distribution**:
- Each document has a probability distribution over topics
- e.g., Document 1: 60% sports, 30% politics, 10% technology

**Topic-Word Distribution**:
- Each topic has a probability distribution over words
- e.g., Sports topic: "game" 0.05, "player" 0.04, "score" 0.03

**Evaluation**:
- Coherence score: Measures topic quality
- Perplexity: Lower is better (but not always more interpretable)
- Human evaluation: Do topics make sense?

### Problem Statement
1. Preprocess a document collection
2. Build an LDA model
3. Visualize and interpret discovered topics
`,
      starterCode: `from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

# Sample document collection
documents = [
    "Machine learning algorithms can learn patterns from data",
    "Neural networks are inspired by the human brain",
    "Python is a popular programming language for data science",
    "Deep learning models require large amounts of training data",
    "Natural language processing helps computers understand text",
    "Supervised learning uses labeled data for training models",
    "Computer vision allows machines to interpret images",
    "Data preprocessing is an important step in machine learning",
    "Transfer learning reuses knowledge from pretrained models",
    "Reinforcement learning agents learn through trial and error",
    "Statistical analysis helps understand data distributions",
    "Feature engineering improves model performance significantly"
]

# TODO: Create document-term matrix
vectorizer = CountVectorizer(max_df=0.9, min_df=2, stop_words='english')
dtm = 

print(f"Document-term matrix: {dtm.shape}")
print(f"Vocabulary size: {len(vectorizer.get_feature_names_out())}")

# TODO: Fit LDA model with 3 topics
lda = LatentDirichletAllocation(n_components=3, random_state=42)
lda.fit(dtm)

# TODO: Display top words per topic
feature_names = vectorizer.get_feature_names_out()
for topic_idx, topic in enumerate(lda.components_):
    top_words = 
    print(f"Topic {topic_idx}: {', '.join(top_words)}")
`,
      solution: `from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

documents = [
    "Machine learning algorithms can learn patterns from data",
    "Neural networks are inspired by the human brain",
    "Python is a popular programming language for data science",
    "Deep learning models require large amounts of training data",
    "Natural language processing helps computers understand text",
    "Supervised learning uses labeled data for training models",
    "Computer vision allows machines to interpret images",
    "Data preprocessing is an important step in machine learning",
    "Transfer learning reuses knowledge from pretrained models",
    "Reinforcement learning agents learn through trial and error",
    "Statistical analysis helps understand data distributions",
    "Feature engineering improves model performance significantly"
]

vectorizer = CountVectorizer(max_df=0.9, min_df=2, stop_words='english')
dtm = vectorizer.fit_transform(documents)

print(f"Document-term matrix: {dtm.shape}")
print(f"Vocabulary: {vectorizer.get_feature_names_out()}")

# Fit LDA
lda = LatentDirichletAllocation(n_components=3, random_state=42, max_iter=20)
lda.fit(dtm)

# Display topics
feature_names = vectorizer.get_feature_names_out()
print("\\n=== Discovered Topics ===")
for topic_idx, topic in enumerate(lda.components_):
    top_indices = topic.argsort()[-5:][::-1]
    top_words = [feature_names[i] for i in top_indices]
    top_weights = [topic[i] for i in top_indices]
    print(f"\\nTopic {topic_idx}:")
    for word, weight in zip(top_words, top_weights):
        print(f"  {word:20s} ({weight:.2f})")

# Document-topic distribution
print("\\n=== Document-Topic Distribution ===")
doc_topics = lda.transform(dtm)
for i, (doc, topics) in enumerate(zip(documents[:5], doc_topics[:5])):
    dominant = np.argmax(topics)
    print(f"Doc {i}: Topic {dominant} ({topics[dominant]:.2f}) - {doc[:50]}...")

print(f"\\nPerplexity: {lda.perplexity(dtm):.2f}")
print("Lower perplexity = better fit (but evaluate topics qualitatively too)")
`,
      code: `from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

docs = [
    "Machine learning algorithms learn patterns from data",
    "Neural networks are inspired by the human brain",
    "Python is popular for data science programming",
    "Deep learning requires large training datasets",
    "NLP helps computers understand human text",
    "Supervised learning uses labeled training data",
    "Computer vision interprets images and video",
    "Data preprocessing is important for ML pipelines",
    "Transfer learning reuses pretrained model knowledge",
    "Feature engineering improves model performance"
]

vec = CountVectorizer(max_df=0.9, min_df=2, stop_words='english')
dtm = vec.fit_transform(docs)
lda = LatentDirichletAllocation(n_components=3, random_state=42).fit(dtm)

words = vec.get_feature_names_out()
for i, topic in enumerate(lda.components_):
    top = [words[j] for j in topic.argsort()[-5:][::-1]]
    print(f"Topic {i}: {', '.join(top)}")
`
    },
    {
      title: 'Document Similarity & Information Retrieval',
      description: `
## Document Similarity & Information Retrieval

### Overview
Document similarity measures how alike two pieces of text are. This is the foundation of search engines, recommendation systems, and duplicate detection.

### Key Concepts

**TF-IDF (Term Frequency-Inverse Document Frequency)**:
- TF: How often a word appears in a document
- IDF: How rare the word is across all documents
- TF-IDF = TF * IDF (rare but frequent words score high)

**Cosine Similarity**:
- Measures angle between two vectors
- Range: 0 (completely different) to 1 (identical)
- Ignores magnitude, focuses on direction

**BM25**:
- Improved version of TF-IDF used by search engines
- Accounts for document length
- Used in Elasticsearch, Lucene

**Semantic Similarity**:
- Beyond keyword matching
- Use sentence embeddings (BERT, Sentence-BERT)
- Captures meaning, not just words

**Applications**:
- Search engines: Find relevant documents
- Plagiarism detection: Find similar text
- Recommendation: Suggest similar articles
- Deduplication: Find duplicate entries

### Problem Statement
1. Compute TF-IDF representations
2. Calculate cosine similarity between documents
3. Build a simple search engine
`,
      starterCode: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Document collection
corpus = [
    "Machine learning is a subset of artificial intelligence",
    "Deep learning uses neural networks with many layers",
    "Natural language processing deals with text and speech",
    "Computer vision enables machines to understand images",
    "Reinforcement learning trains agents through rewards",
    "Data science combines statistics and programming",
    "Neural networks are inspired by biological neurons",
    "AI is transforming healthcare and medicine"
]

# TODO: Create TF-IDF matrix
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = 

print(f"TF-IDF matrix shape: {tfidf_matrix.shape}")

# TODO: Compute cosine similarity between all documents
sim_matrix = 

print("\\nSimilarity matrix (first 4 docs):")
for i in range(4):
    for j in range(4):
        print(f"{sim_matrix[i][j]:.3f}", end=" ")
    print()

# TODO: Build a search function
def search(query, top_k=3):
    # Transform query using the same vectorizer
    query_vec = 
    # Compute similarity with all documents
    scores = 
    # Return top-k results
    pass

results = search("neural networks and deep learning")
for score, doc in results:
    print(f"  [{score:.3f}] {doc}")
`,
      solution: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

corpus = [
    "Machine learning is a subset of artificial intelligence",
    "Deep learning uses neural networks with many layers",
    "Natural language processing deals with text and speech",
    "Computer vision enables machines to understand images",
    "Reinforcement learning trains agents through rewards",
    "Data science combines statistics and programming",
    "Neural networks are inspired by biological neurons",
    "AI is transforming healthcare and medicine"
]

vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(corpus)

print(f"TF-IDF shape: {tfidf_matrix.shape}")
print(f"Vocabulary size: {len(vectorizer.get_feature_names_out())}")

# Cosine similarity
sim_matrix = cosine_similarity(tfidf_matrix)

print("\\nDocument Similarity Matrix:")
for i in range(len(corpus)):
    for j in range(len(corpus)):
        print(f"{sim_matrix[i][j]:.2f}", end=" ")
    print()

# Find most similar pairs
print("\\nMost Similar Document Pairs:")
pairs = []
for i in range(len(corpus)):
    for j in range(i+1, len(corpus)):
        pairs.append((sim_matrix[i][j], i, j))

pairs.sort(reverse=True)
for score, i, j in pairs[:3]:
    print(f"  [{score:.3f}] Doc {i} <-> Doc {j}")
    print(f"    {corpus[i]}")
    print(f"    {corpus[j]}")

# Search function
def search(query, top_k=3):
    query_vec = vectorizer.transform([query])
    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = scores.argsort()[-top_k:][::-1]
    return [(scores[i], corpus[i]) for i in top_indices]

queries = [
    "neural networks and deep learning",
    "understanding images with AI",
    "text processing and language"
]

print("\\n=== Search Engine ===")
for query in queries:
    print(f"\\nQuery: '{query}'")
    results = search(query)
    for score, doc in results:
        print(f"  [{score:.3f}] {doc}")
`,
      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

corpus = [
    "Machine learning is a subset of AI",
    "Deep learning uses neural networks",
    "NLP deals with text and speech",
    "Computer vision understands images",
    "RL trains agents through rewards",
    "Neural networks mimic biological neurons"
]

vec = TfidfVectorizer(stop_words='english')
tfidf = vec.fit_transform(corpus)

def search(query, k=3):
    q = vec.transform([query])
    scores = cosine_similarity(q, tfidf).flatten()
    top = scores.argsort()[-k:][::-1]
    return [(scores[i], corpus[i]) for i in top]

for q in ["neural networks", "image recognition", "text processing"]:
    print(f"Query: '{q}'")
    for score, doc in search(q):
        print(f"  [{score:.3f}] {doc}")
    print()
`
    },
    {
      title: 'Hugging Face Ecosystem',
      description: `
## Hugging Face Ecosystem

### Overview
Hugging Face has become the central hub for modern NLP and AI. Their ecosystem includes pre-trained models, datasets, and tools that make state-of-the-art NLP accessible to everyone.

### Key Components

**Transformers Library**:
- 100,000+ pre-trained models
- Pipeline API for easy inference
- Support for PyTorch, TensorFlow, JAX
- Models: BERT, GPT-2, T5, Llama, Mistral

**Pipeline API**:
- One-line inference for common tasks
- Tasks: sentiment, NER, QA, summarization, translation
- Auto model and tokenizer selection

**Model Hub**:
- Browse and share models
- Model cards with documentation
- Version control for models

**Datasets Library**:
- 50,000+ datasets
- Streaming for large datasets
- Built-in preprocessing

**Tokenizers Library**:
- Fast tokenization in Rust
- BPE, WordPiece, Unigram
- Custom tokenizer training

### Problem Statement
1. Use Hugging Face pipelines for various NLP tasks
2. Load and use pre-trained models
3. Explore the datasets library
`,
      starterCode: `from transformers import pipeline

# TODO: Sentiment Analysis
print("=== Sentiment Analysis ===")
sentiment = pipeline("sentiment-analysis")
texts = [
    "I love this product! It's amazing!",
    "This is terrible, worst purchase ever.",
    "It's okay, nothing special."
]

for text in texts:
    result = 
    print(f"  {text}")
    print(f"  -> {result}\\n")

# TODO: Text Summarization
print("=== Summarization ===")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
article = """
Artificial intelligence has made remarkable progress in recent years. 
Machine learning models can now perform tasks that were once thought 
to be exclusively human. From language translation to medical diagnosis, 
AI systems are becoming increasingly capable and widely deployed.
"""
summary = 
print(f"Summary: {summary}")

# TODO: Named Entity Recognition
print("\\n=== Named Entity Recognition ===")
ner = pipeline("ner", grouped_entities=True)
text = "Apple CEO Tim Cook announced new AI features at WWDC in San Francisco."
entities = 
for entity in entities:
    print(f"  {entity['word']:20s} -> {entity['entity_group']:10s} ({entity['score']:.3f})")
`,
      solution: `from transformers import pipeline

# Sentiment Analysis
print("=== Sentiment Analysis ===")
sentiment = pipeline("sentiment-analysis")
texts = [
    "I love this product! It's amazing!",
    "This is terrible, worst purchase ever.",
    "It's okay, nothing special."
]

for text in texts:
    result = sentiment(text)[0]
    print(f"  {text}")
    print(f"  -> {result['label']} (confidence: {result['score']:.3f})\\n")

# Summarization
print("=== Summarization ===")
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
article = """
Artificial intelligence has made remarkable progress in recent years. 
Machine learning models can now perform tasks that were once thought 
to be exclusively human. From language translation to medical diagnosis, 
AI systems are becoming increasingly capable and widely deployed.
"""
summary = summarizer(article, max_length=50, min_length=10, do_sample=False)
print(f"Summary: {summary[0]['summary_text']}")

# Named Entity Recognition
print("\\n=== Named Entity Recognition ===")
ner = pipeline("ner", grouped_entities=True)
text = "Apple CEO Tim Cook announced new AI features at WWDC in San Francisco."
entities = ner(text)
for entity in entities:
    print(f"  {entity['word']:20s} -> {entity['entity_group']:10s} ({entity['score']:.3f})")

# Zero-Shot Classification
print("\\n=== Zero-Shot Classification ===")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
result = classifier(
    "I need to fix a bug in my Python code",
    candidate_labels=["programming", "cooking", "sports", "music"]
)
print(f"Text: 'I need to fix a bug in my Python code'")
for label, score in zip(result['labels'], result['scores']):
    print(f"  {label:15s}: {score:.3f}")

# Text Generation
print("\\n=== Text Generation ===")
generator = pipeline("text-generation", model="gpt2")
result = generator("Machine learning is", max_length=30, num_return_sequences=1)
print(f"Generated: {result[0]['generated_text']}")

print("\\nHugging Face makes state-of-the-art NLP accessible to everyone!")
`,
      code: `from transformers import pipeline

# Sentiment
sentiment = pipeline("sentiment-analysis")
for text in ["I love this!", "This is terrible.", "It's okay."]:
    r = sentiment(text)[0]
    print(f"{r['label']:8s} ({r['score']:.3f}): {text}")

# NER
print("\\nNamed Entities:")
ner = pipeline("ner", grouped_entities=True)
for e in ner("Tim Cook announced new Apple AI features in San Francisco."):
    print(f"  {e['word']:15s} -> {e['entity_group']}")

# Zero-shot
print("\\nZero-Shot Classification:")
zsc = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
r = zsc("Fix a bug in Python code", candidate_labels=["programming", "cooking", "sports"])
for l, s in zip(r['labels'], r['scores']):
    print(f"  {l:15s}: {s:.3f}")
`
    }
  ]
};

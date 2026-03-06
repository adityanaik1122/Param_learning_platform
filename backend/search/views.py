from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from groq import Groq
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Comprehensive AI/ML Topics Knowledge Base with Deep Definitions
AI_ML_DEFINITIONS = {
    'nlp': '''Natural Language Processing (NLP) is a multidisciplinary field at the intersection of artificial intelligence, computational linguistics, and computer science that focuses on enabling computers to understand, interpret, manipulate, and generate human language in a valuable way.

Core Components:
• Tokenization: Breaking text into words, sentences, or subwords
• Part-of-Speech Tagging: Identifying grammatical roles of words
• Named Entity Recognition: Extracting entities like names, locations, organizations
• Sentiment Analysis: Determining emotional tone and opinions
• Machine Translation: Converting text between languages
• Question Answering: Understanding queries and providing relevant answers

Key Technologies:
• Word Embeddings (Word2Vec, GloVe): Dense vector representations capturing semantic meaning
• Transformers: Self-attention mechanisms for parallel processing of sequences
• BERT: Bidirectional encoder for contextual understanding
• GPT: Generative pre-trained models for text generation
• Sequence-to-Sequence Models: Encoder-decoder architectures for translation and summarization

Applications:
• Chatbots and Virtual Assistants (Siri, Alexa, ChatGPT)
• Language Translation (Google Translate)
• Content Moderation and Spam Detection
• Medical Record Analysis
• Legal Document Processing
• Sentiment Analysis for Market Research''',

    'machine learning': '''Machine Learning (ML) is a subset of artificial intelligence that enables computer systems to automatically learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data, learn patterns, and make decisions with minimal human intervention.

Core Paradigms:
• Supervised Learning: Learning from labeled data (classification, regression)
• Unsupervised Learning: Finding patterns in unlabeled data (clustering, dimensionality reduction)
• Reinforcement Learning: Learning through interaction and rewards
• Semi-Supervised Learning: Combining labeled and unlabeled data
• Transfer Learning: Applying knowledge from one domain to another

Key Algorithms:
• Linear Regression: Predicting continuous values
• Logistic Regression: Binary and multi-class classification
• Decision Trees: Rule-based hierarchical models
• Random Forests: Ensemble of decision trees
• Support Vector Machines: Maximum margin classifiers
• K-Means Clustering: Partitioning data into groups
• Neural Networks: Interconnected layers of artificial neurons

The ML Pipeline:
1. Data Collection: Gathering relevant datasets
2. Data Preprocessing: Cleaning, normalization, feature engineering
3. Model Selection: Choosing appropriate algorithms
4. Training: Learning patterns from data
5. Evaluation: Testing performance on unseen data
6. Deployment: Integrating into production systems
7. Monitoring: Tracking performance and detecting drift

Real-World Applications:
• Recommendation Systems (Netflix, Amazon)
• Fraud Detection in Banking
• Medical Diagnosis and Drug Discovery
• Autonomous Vehicles
• Predictive Maintenance in Manufacturing
• Customer Churn Prediction''',

    'deep learning': '''Deep Learning is a specialized subset of machine learning based on artificial neural networks with multiple layers (hence "deep") that can learn hierarchical representations of data. It has revolutionized AI by achieving human-level or superhuman performance in tasks like image recognition, speech processing, and game playing.

Architecture Fundamentals:
• Input Layer: Receives raw data
• Hidden Layers: Extract increasingly abstract features
• Output Layer: Produces final predictions
• Activation Functions: Introduce non-linearity (ReLU, Sigmoid, Tanh)
• Backpropagation: Algorithm for computing gradients
• Optimization: SGD, Adam, RMSprop for weight updates

Major Architectures:
• Feedforward Neural Networks: Basic fully-connected layers
• Convolutional Neural Networks (CNNs): Specialized for spatial data (images)
• Recurrent Neural Networks (RNNs): Process sequential data
• Long Short-Term Memory (LSTM): Handle long-range dependencies
• Transformers: Self-attention for parallel sequence processing
• Generative Adversarial Networks (GANs): Generate realistic synthetic data
• Autoencoders: Unsupervised representation learning

Training Techniques:
• Batch Normalization: Stabilize training
• Dropout: Prevent overfitting
• Data Augmentation: Increase training data diversity
• Transfer Learning: Fine-tune pre-trained models
• Learning Rate Scheduling: Adaptive optimization
• Gradient Clipping: Prevent exploding gradients

Breakthrough Applications:
• Computer Vision: Object detection, facial recognition, medical imaging
• Natural Language Processing: Translation, summarization, question answering
• Speech Recognition: Voice assistants, transcription
• Game AI: AlphaGo, OpenAI Five
• Autonomous Systems: Self-driving cars, drones
• Drug Discovery: Protein folding, molecular design''',

    'transformer': '''Transformers are a revolutionary neural network architecture introduced in the 2017 paper "Attention Is All You Need" that has become the foundation of modern NLP and is expanding into computer vision and other domains. Unlike RNNs, transformers process entire sequences in parallel using self-attention mechanisms.

Core Components:
• Self-Attention Mechanism: Allows each position to attend to all positions in the sequence
• Multi-Head Attention: Multiple attention mechanisms running in parallel
• Positional Encoding: Injects sequence order information
• Feed-Forward Networks: Applied to each position independently
• Layer Normalization: Stabilizes training
• Residual Connections: Enable gradient flow in deep networks

Attention Formula:
Attention(Q, K, V) = softmax(QK^T / √d_k)V
Where Q=Query, K=Key, V=Value, d_k=dimension of keys

Architecture Variants:
• Encoder-Only: BERT, RoBERTa (bidirectional understanding)
• Decoder-Only: GPT series (autoregressive generation)
• Encoder-Decoder: T5, BART (sequence-to-sequence tasks)

Key Advantages:
• Parallelization: Process entire sequences simultaneously
• Long-Range Dependencies: Capture relationships across long distances
• Interpretability: Attention weights show what the model focuses on
• Scalability: Efficient training on massive datasets
• Transfer Learning: Pre-train once, fine-tune for many tasks

Modern Applications:
• Large Language Models: GPT-4, Claude, Gemini
• Machine Translation: Google Translate, DeepL
• Code Generation: GitHub Copilot, CodeLlama
• Image Generation: DALL-E, Stable Diffusion (Vision Transformers)
• Protein Structure Prediction: AlphaFold
• Multi-Modal Models: CLIP, Flamingo

Training Considerations:
• Computational Cost: O(n²) complexity for sequence length n
• Memory Requirements: Attention matrices can be large
• Optimization: Requires careful hyperparameter tuning
• Data Requirements: Benefits from massive pre-training datasets''',

    'llm': '''Large Language Models (LLMs) are AI systems trained on massive amounts of text data (trillions of tokens) to understand and generate human-like text. They represent a paradigm shift in NLP, demonstrating emergent capabilities like reasoning, coding, and multi-step problem solving.

Training Stages:
1. Pre-training: Unsupervised learning on massive text corpora
   - Next token prediction (GPT-style)
   - Masked language modeling (BERT-style)
   - Mixture of objectives (T5-style)

2. Supervised Fine-Tuning (SFT): Teaching specific behaviors
   - Instruction following
   - Conversational abilities
   - Task-specific adaptation

3. Reinforcement Learning from Human Feedback (RLHF):
   - Reward modeling from human preferences
   - Policy optimization (PPO, DPO)
   - Alignment with human values

Major LLM Families:
• GPT Series (OpenAI): GPT-3, GPT-3.5, GPT-4, GPT-4 Turbo
• Claude (Anthropic): Claude 2, Claude 3 (Opus, Sonnet, Haiku)
• Gemini (Google): Gemini Pro, Gemini Ultra
• LLaMA (Meta): Open-source foundation models
• Mistral: Efficient open-source models

Key Capabilities:
• Few-Shot Learning: Learn from examples in the prompt
• Chain-of-Thought: Step-by-step reasoning
• Code Generation: Write and debug code
• Multi-Lingual: Understand and generate multiple languages
• Multi-Modal: Process text, images, audio (GPT-4V, Gemini)
• Tool Use: Call external APIs and functions

Limitations and Challenges:
• Hallucinations: Generating plausible but incorrect information
• Context Length: Limited by maximum token windows
• Computational Cost: Expensive to train and run
• Bias: Reflecting biases in training data
• Interpretability: Difficult to understand decision-making
• Safety: Potential for misuse

Production Considerations:
• Prompt Engineering: Crafting effective instructions
• Temperature: Controlling randomness (0=deterministic, 1=creative)
• Top-p Sampling: Nucleus sampling for quality
• System Prompts: Setting behavior and constraints
• Rate Limiting: Managing API costs
• Caching: Storing common responses''',

    'rag': '''Retrieval-Augmented Generation (RAG) is an AI framework that combines information retrieval with text generation to produce accurate, grounded responses. It addresses the hallucination problem in LLMs by retrieving relevant documents from a knowledge base before generating answers.

RAG Architecture:
1. Indexing Phase:
   - Document Collection: Gather knowledge sources
   - Chunking: Split documents into manageable pieces
   - Embedding: Convert chunks to dense vectors
   - Storage: Store in vector database

2. Retrieval Phase:
   - Query Embedding: Convert user question to vector
   - Similarity Search: Find most relevant chunks
   - Ranking: Order results by relevance
   - Context Selection: Choose top-k documents

3. Generation Phase:
   - Context Injection: Add retrieved docs to prompt
   - LLM Generation: Produce grounded response
   - Citation: Reference source documents

Key Components:
• Embedding Models: OpenAI Ada, Sentence-BERT, Instructor
• Vector Databases: Pinecone, Weaviate, Chroma, FAISS, Qdrant
• Chunking Strategies: Fixed-size, semantic, recursive
• Retrieval Methods: Dense, sparse, hybrid search
• Reranking: Cross-encoder models for better relevance

Advanced Techniques:
• Hypothetical Document Embeddings (HyDE): Generate hypothetical answers first
• Multi-Query: Generate multiple query variations
• Parent-Child Chunking: Retrieve small, provide large context
• Metadata Filtering: Pre-filter by date, category, etc.
• Query Decomposition: Break complex queries into sub-questions

Evaluation Metrics:
• Faithfulness: Is the answer grounded in retrieved docs?
• Answer Relevancy: Does it address the question?
• Context Relevancy: Are retrieved docs relevant?
• Retrieval Precision: Accuracy of document retrieval
• End-to-End Accuracy: Overall system performance

Production Best Practices:
• Chunk Size: 200-500 tokens typically optimal
• Overlap: 10-20% overlap between chunks
• Top-k: Retrieve 3-5 documents usually sufficient
• Reranking: Improves quality significantly
• Caching: Store embeddings and common queries
• Monitoring: Track retrieval quality and latency

Real-World Applications:
• Customer Support: Answer questions from documentation
• Legal Research: Find relevant case law and statutes
• Medical Diagnosis: Reference medical literature
• Code Documentation: Search codebases and docs
• Enterprise Search: Internal knowledge management
• Educational Tutors: Teach from textbooks and materials'''
}

# Add more topics with shorter definitions
AI_ML_DEFINITIONS.update({
    'neural network': 'A Neural Network is a computing system inspired by biological neural networks. It consists of interconnected nodes (neurons) organized in layers that process information through weighted connections, learning patterns from data through backpropagation.',
    'cnn': 'Convolutional Neural Networks (CNNs) are specialized deep learning architectures for processing grid-like data such as images. They use convolutional layers with learnable filters to automatically extract spatial hierarchies of features, making them highly effective for computer vision tasks.',
    'rnn': 'Recurrent Neural Networks (RNNs) are neural networks designed for sequential data. They maintain a hidden state that acts as memory, allowing them to process sequences of variable length. LSTMs and GRUs are advanced RNN variants that handle long-range dependencies better.',
    'reinforcement learning': 'Reinforcement Learning is a machine learning paradigm where an agent learns to make decisions by interacting with an environment. The agent receives rewards or penalties for its actions and learns to maximize cumulative reward through trial and error, using techniques like Q-learning and policy gradients.',
})


def get_definition(query):
    """Get AI/ML definition from knowledge base"""
    query_lower = query.lower()
    
    # Check for exact matches
    for key, definition in AI_ML_DEFINITIONS.items():
        if key in query_lower:
            return definition
    
    # Default response for AI/ML related queries
    if any(term in query_lower for term in ['ai', 'artificial intelligence', 'ml', 'data science', 'algorithm']):
        return f"'{query}' is a concept in Artificial Intelligence and Machine Learning. It involves using computational methods to analyze data, learn patterns, and make intelligent decisions."
    
    return f"'{query}' is a topic in technology and computer science. For detailed information, please check the learning resources and videos below."


def search_youtube_videos(query, max_results=4):
    """Search YouTube for educational videos with better filtering"""
    api_key = os.getenv('YOUTUBE_API_KEY')
    
    if not api_key:
        # Return empty list if no API key - will use LLM instead
        return []
    
    try:
        # Add educational keywords to improve results
        educational_query = f'{query} tutorial explained machine learning AI course lecture'
        
        url = 'https://www.googleapis.com/youtube/v3/search'
        params = {
            'part': 'snippet',
            'q': educational_query,
            'type': 'video',
            'maxResults': max_results * 2,  # Get more to filter
            'key': api_key,
            'relevanceLanguage': 'en',
            'order': 'relevance',
            'videoCategoryId': '28',  # Science & Technology category
            'safeSearch': 'strict'
        }
        
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        videos = []
        # Filter out music videos and irrelevant content
        excluded_keywords = ['music', 'song', 'official video', 'mv', 'audio', 'lyrics', 
                            'never gonna give you up', 'rick astley', 'rickroll']
        
        for item in data.get('items', []):
            title = item['snippet']['title'].lower()
            description = item['snippet'].get('description', '').lower()
            
            # Skip if contains excluded keywords
            if any(keyword in title or keyword in description for keyword in excluded_keywords):
                continue
            
            # Prefer educational content
            educational_indicators = ['tutorial', 'explained', 'course', 'lecture', 'learn',
                                     'introduction', 'guide', 'deep dive', 'understanding']
            
            videos.append({
                'title': item['snippet']['title'],
                'videoId': item['id']['videoId'],
                'thumbnail': item['snippet']['thumbnails']['high']['url'],  # Higher quality
                'channelTitle': item['snippet']['channelTitle'],
                'description': item['snippet']['description'][:200]  # Add description
            })
            
            if len(videos) >= max_results:
                break
        
        return videos
    except Exception as e:
        print(f"YouTube API error: {e}")
        return []


@api_view(['POST'])
@permission_classes([AllowAny])
def search_topic(request):
    """Search for AI/ML topics and return definition + YouTube videos"""
    query = request.data.get('query', '').strip()
    
    if not query:
        return Response(
            {'error': 'Query parameter is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get definition
    definition = get_definition(query)
    
    # Search YouTube videos
    videos = search_youtube_videos(query)
    
    return Response({
        'definition': definition,
        'videos': videos,
        'query': query
    })



def get_llm_definition(query):
    """
    Use cloud LLM APIs to generate comprehensive definition
    Supports multiple providers with fallback chain:
    1. Anthropic Claude (best quality)
    2. OpenAI GPT (widely available)
    3. Groq (free, fast)
    4. Together AI (free tier)
    5. Fallback to structured response
    """
    
    # Try providers in order of preference
    providers = [
        ('anthropic', get_anthropic_definition),
        ('openai', get_openai_definition),
        ('groq', get_groq_definition),
        ('together', get_together_definition),
    ]
    
    for provider_name, provider_func in providers:
        try:
            result = provider_func(query)
            if result and len(result) > 100:
                print(f"✅ Generated definition using {provider_name}")
                return result
        except Exception as e:
            print(f"⚠️ {provider_name} failed: {e}")
            continue
    
    # Fallback to structured response
    return get_fallback_definition(query)


def get_anthropic_definition(query):
    """Use Anthropic Claude API (best quality, paid)"""
    api_key = os.getenv('ANTHROPIC_API_KEY')
    if not api_key:
        return None
    
    prompt = f"""You are an expert AI/ML educator. Provide a comprehensive, educational explanation of '{query}' in the context of Artificial Intelligence and Machine Learning.

Structure your response as follows:

**Core Concept:**
Explain what {query} is in 2-3 clear sentences.

**Key Components:**
List and briefly explain the main components, techniques, or building blocks.

**How It Works:**
Describe the underlying mechanism or process in simple terms.

**Real-World Applications:**
Provide 3-4 concrete examples of where this is used in industry.

**Why It Matters:**
Explain the significance and impact on AI/ML field.

Keep it educational, accurate, and suitable for learners at intermediate level."""

    response = requests.post(
        'https://api.anthropic.com/v1/messages',
        headers={
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        json={
            'model': 'claude-3-haiku-20240307',  # Cheapest Claude model
            'max_tokens': 1024,
            'messages': [
                {'role': 'user', 'content': prompt}
            ]
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        return data['content'][0]['text']
    
    return None


def get_openai_definition(query):
    """Use OpenAI GPT API (widely available, paid)"""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        return None
    
    prompt = f"""You are an expert AI/ML educator. Provide a comprehensive explanation of '{query}' in AI/ML context.

Include:
- Core concept (2-3 sentences)
- Key components
- How it works
- Real-world applications
- Why it matters

Keep it educational and clear."""

    response = requests.post(
        'https://api.openai.com/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        },
        json={
            'model': 'gpt-3.5-turbo',  # Cheaper than GPT-4
            'messages': [
                {'role': 'system', 'content': 'You are an expert AI/ML educator.'},
                {'role': 'user', 'content': prompt}
            ],
            'max_tokens': 800,
            'temperature': 0.7
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        return data['choices'][0]['message']['content']
    
    return None


def get_groq_definition(query):
    """Use Groq API (FREE tier available, very fast)"""
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        return None
    
    try:
        # Initialize Groq client
        client = Groq(api_key=api_key)
        
        # Create comprehensive prompt
        prompt = f"""You are an expert AI/ML educator. Provide a comprehensive, educational explanation of '{query}' in the context of Artificial Intelligence and Machine Learning.

Structure your response as follows:

**Core Concept:**
Explain what {query} is in 2-3 clear sentences.

**Key Components:**
List and briefly explain the main components, techniques, or building blocks.

**How It Works:**
Describe the underlying mechanism or process in simple terms.

**Real-World Applications:**
Provide 3-4 concrete examples of where this is used in industry.

**Why It Matters:**
Explain the significance and impact on the AI/ML field.

Keep it educational, accurate, and suitable for learners at intermediate level."""
        
        # Get response from Groq using official SDK
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert AI/ML educator. Provide clear, comprehensive, and accurate explanations."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama-3.1-8b-instant",  # Fast and free model
            temperature=0.7,
            max_tokens=800,
        )
        
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        print(f"Groq API error: {e}")
        return None


def get_together_definition(query):
    """Use Together AI API (FREE tier available)"""
    api_key = os.getenv('TOGETHER_API_KEY')
    if not api_key:
        return None
    
    prompt = f"""Explain '{query}' in AI/ML context comprehensively. Include core concept, components, applications, and significance."""

    response = requests.post(
        'https://api.together.xyz/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        },
        json={
            'model': 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            'messages': [
                {'role': 'system', 'content': 'You are an expert AI/ML educator.'},
                {'role': 'user', 'content': prompt}
            ],
            'max_tokens': 800,
            'temperature': 0.7
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        return data['choices'][0]['message']['content']
    
    return None


def get_fallback_definition(query):
    """Fallback structured response when no API available"""
    return f"""**{query}** is an important concept in Artificial Intelligence and Machine Learning.

**Core Concept:**
{query} involves computational methods and algorithms that enable systems to process data, learn patterns, and make intelligent decisions. It represents a key area of study for anyone pursuing AI/ML engineering.

**Key Components:**
• Data Processing: Handling and transforming input data
• Algorithm Design: Creating efficient computational methods
• Model Training: Learning patterns from examples
• Evaluation: Measuring performance and accuracy

**Real-World Applications:**
This technology is widely used in modern applications including:
• Recommendation systems (Netflix, Amazon)
• Natural language processing (ChatGPT, translation)
• Computer vision (facial recognition, autonomous vehicles)
• Predictive analytics (finance, healthcare)

**Why It Matters:**
Understanding {query} is essential for building intelligent systems that can solve real-world problems at scale. It forms the foundation for many cutting-edge AI applications transforming industries today.

*Note: For more detailed information, please configure an LLM API key in your environment settings.*"""


@api_view(['POST'])
@permission_classes([AllowAny])
def search_topic(request):
    """Enhanced search with LLM fallback and better video filtering"""
    query = request.data.get('query', '').strip()
    
    if not query:
        return Response(
            {'error': 'Query parameter is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get definition from knowledge base or LLM
    definition = get_definition(query)
    
    # If definition is generic, try LLM enhancement
    if "is a topic in technology" in definition or "is a concept in Artificial Intelligence" in definition:
        llm_definition = get_llm_definition(query)
        if llm_definition and len(llm_definition) > len(definition):
            definition = llm_definition
    
    # Search YouTube videos with better filtering
    videos = search_youtube_videos(query)
    
    return Response({
        'definition': definition,
        'videos': videos,
        'query': query,
        'source': 'knowledge_base' if any(key in query.lower() for key in AI_ML_DEFINITIONS.keys()) else 'llm_generated'
    })

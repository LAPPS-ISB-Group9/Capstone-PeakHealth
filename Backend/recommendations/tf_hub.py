
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from bs4 import BeautifulSoup
# import tensorflow as tf
# import tensorflow_hub as hub
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load the dataset
df = pd.read_csv('yt_videos_meta.csv')

# Preprocess the text
def preprocess_text(text):
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    # Remove HTML tags
    # text = BeautifulSoup(text, 'lxml').get_text()
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    text = re.sub(r'[^\w\s]', '', text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_text = [w for w in word_tokens if not w in stop_words]
    text = ' '.join(filtered_text)
    return text

df['Video_Title'] = df['Video_Title'].apply(preprocess_text)
df['Video_Description'] = df['Video_Description'].apply(preprocess_text)

# Load Universal Sentence Encoder (USE) module
# use_module = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")

# Define a function to calculate similarity scores using USE embeddings
def calculate_similarity_use(query, corpus):
    query_embedding = use_module([query])[0].numpy()
    corpus_embeddings = use_module(corpus).numpy()
    similarity_scores = cosine_similarity([query_embedding], corpus_embeddings)[0]
    return similarity_scores

@csrf_exempt
def recommend_videos(request):
    if request.method == 'POST':
        data = request.POST.get('queries')
        queries = data.split('\n')
        
        # Create a copy of the dataset and add similarity scores
        df_copy = df.copy()

        result = []
        for query in queries:
            query = preprocess_text(query)
            df_copy['Similarity_Score'] = calculate_similarity_use(query, df_copy['Video_Title'] + ' ' + df_copy['Video_Description'])
            # Sort the dataframe by similarity score in descending order
            df_sorted = df_copy.sort_values(by='Similarity_Score', ascending=False)
            # Get recommended video details for top 15 videos
            recommended_videos = df_sorted.head(15).to_dict('records')
            result.append({
                'query': query,
                'recommended_videos': recommended_videos
            })

        return JsonResponse(result, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
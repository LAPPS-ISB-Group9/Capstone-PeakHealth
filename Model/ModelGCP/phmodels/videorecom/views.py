from django.shortcuts import render
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
import os
import json
from django.conf import settings
# Create your views here.




from django.shortcuts import render
import h5py
import numpy as np
import pandas as pd
import openai
from django.http import JsonResponse
from .models import *
# from sklearn.metrics.pairwise import cosine_similarity
from django.views.decorators.csrf import csrf_exempt

from nltk.tokenize import sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import unicodedata
import nltk
import re
import json
from django.shortcuts import get_object_or_404
from bs4 import BeautifulSoup
import string

nltk.download('stopwords')
nltk.download('wordnet')
# Create your views here.

openai.api_key = "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"

from openai.embeddings_utils import (
    get_embedding,
)

# constants
EMBEDDING_MODEL = "text-embedding-ada-002"

def remove_emojis(text):
    # Pattern to identify emojis
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text)

def preprocess_text(text):
    if not isinstance(text, str):  # Check if the text is a string
        return ''
        
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    
    # Remove HTML tags
    text = BeautifulSoup(text, 'html.parser').get_text()
    
    # Remove punctuations
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove emojis
    text = remove_emojis(text)
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove extra whitespace
    text = re.sub('\s+', ' ', text).strip()
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    text = ' '.join(word for word in text.split() if word not in stop_words)
    
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    text = ' '.join(lemmatizer.lemmatize(word) for word in text.split())
    
    return text

def preprocess_dataset(dataset):
    # Combine 'Video_Title' and 'Video_Description' into a single column
    dataset['Text'] = dataset['Video_Title'].fillna('') + ' ' + dataset['Video_Description'].fillna('')
    
    # Apply preprocessing function to the combined text column
    dataset['Text'] = dataset['Text'].apply(preprocess_text)
    
    return dataset


df = pd.read_csv("Final_Data.csv")

# preprocessed_df = preprocess_dataset(df)

# # Convert the video length column to minutes
# preprocessed_df['video_length_min'] = pd.to_timedelta(preprocessed_df['Video_Length']).dt.total_seconds() / 60. #video_length

# # Filter the dataframe based on video length criteria
# filtered_df = df[(df['video_length_min'] > 2) & (df['video_length_min'] < 25)]

# # Sort the filtered dataframe by video length
# filtered_df = filtered_df.sort_values('video_length_min')

# # As we have our DataFrame stored in 'filtered_df'
# texts = filtered_df['Text'].tolist()


# Load the HDF5 file with stored embeddings

with h5py.File('embeddings_29Jun.h5', 'r') as hdf5_file:
    embeddings = hdf5_file['embeddings'][:]


# Compute cosine similarity between the input embedding and the stored embeddings
def compute_similarity(input_embedding, stored_embeddings):
    
    similarities = cosine_similarity([input_embedding], stored_embeddings)
    return similarities


def embedding_from_string(string: str, model: str = EMBEDDING_MODEL) -> list:
    """Return embedding of given string by requesting it via the API."""
    embedding = get_embedding(string, model)
    return embedding


# Function to select videos based on domain and level
def select_videos(domain_df, level):
    if level == "High":
        return domain_df.head(3)
    elif level == "Moderate":
        return domain_df.head(2)
    elif level == "Low":
        return domain_df.head(1)
    else:
        return pd.DataFrame()  # Empty dataframe if level is not recognized

# def calculate_similarity(embedding1, embedding2):
#     """Calculate cosine similarity between two embeddings."""
#     similarity_score = cosine_similarity([embedding1], [embedding2])[0][0]
#     return similarity_score

def cosine_similarity_f(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm1 = np.linalg.norm(vector1)
    norm2 = np.linalg.norm(vector2)
    similarity = dot_product / (norm1 * norm2)
    return similarity

# Define a function to perform the similarity search and retrieve top-k rows
def retrieve_top_k_rows(external_input):

    TOP_K = 5
    # Preprocess the external input data
    preprocessed_input = preprocess_text(external_input)

    # Compute the embedding for the preprocessed input
    external_embedding = embedding_from_string(preprocessed_input)

    # Convert the external embedding to a numpy array
    external_embedding = np.array(external_embedding)

    # Calculate cosine similarity between the external embedding and all stored embeddings
    # similarity_scores = cosine_similarity(external_embedding.reshape(1, -1), embeddings)[0]

    # Calculate cosine similarity between the external embedding and all stored embeddings
    similarity_scores = [cosine_similarity_f(external_embedding, embedding) for embedding in embeddings]

    # Get the indices of the top-k most similar rows
    top_indices = np.argsort(similarity_scores)[-TOP_K:][::-1]

    # Retrieve the top-k rows from the DataFrame
    top_k_rows = df.iloc[top_indices]

    # Add similarity scores to the DataFrame
    # top_k_rows['Similarity Score'] = similarity_scores[top_indices]
    top_k_rows['Similarity Score'] = [similarity_scores[i] for i in top_indices]


    return top_k_rows


@csrf_exempt
def recommendations(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        json_data = json.loads(data)
        test_id = json_data['test_id']
        # print(json_data)
        print(test_id)
        # Check if videos already exist for the test_id
        existing_results = TestVideoResult.objects.filter(test_id=test_id)
        if existing_results.exists():
            # Videos already exist, retrieve and return the existing results
            selected_videos = []
            for result in existing_results:
                video = {
                    "Video_URL": result.video_url,
                    "Video_Title": result.video_title,
                    "Similarity_Score": result.similarity_score
                }
                selected_videos.append(video)

            result = {
                'test_id': test_id,
                'selected_videos': selected_videos
            }

            return JsonResponse(result, safe=False)

        # Continue with the video recommendation process if videos don't exist
        # ee_llm = preprocess_text(json_data['ee_llm'])
        # dp_llm = preprocess_text(json_data['dp_llm'])
        # pa_llm = preprocess_text(json_data['pa_llm'])
        ee_llm = json_data['ee_llm']
        dp_llm = json_data['dp_llm']
        pa_llm = json_data['pa_llm']
        # ee_level = json_data['ee_level']
        # dp_level = json_data.get('dp_level', 'moderate')
        # pa_level = json_data.get('pa_level', 'moderate')

        result = {}
        result['test_id'] = test_id
        result['ee_llm'] = ee_llm
        result['dp_llm'] = dp_llm
        result['pa_llm'] = pa_llm

       
        # Retrieve top-k rows for each external input
        ee_llm_oe = retrieve_top_k_rows(ee_llm)
        dp_llm_oe = retrieve_top_k_rows(dp_llm)
        pa_llm_oe = retrieve_top_k_rows(pa_llm)

        # Concatenate the dataframes and remove duplicates
        overext = pd.concat([ee_llm_oe, dp_llm_oe, pa_llm_oe]).drop_duplicates(subset="Video_URL")

        # Display only 'Video_URL', 'Video_Title', and 'Similarity Score'
        overext = overext[['Video_URL', 'Video_Title', 'Similarity Score']]

        sorted_overext = overext.sort_values(by='Similarity Score', ascending=False)
        overext = sorted_overext.head(9) if len(sorted_overext) >= 9 else sorted_overext

        # Convert the resulting DataFrame to a list of dictionaries
        selected_videos = overext.to_dict(orient='records')

        # Create a dictionary with the selected videos
        output_dict = {"selected_videos": selected_videos}

        # Iterate over the rows of the DataFrame
        for _, row in overext.iterrows():
            # Extract the relevant data from the row
            video_url = row['Video_URL']
            video_title = row['Video_Title']
            similarity_score = row['Similarity Score']

            # Create an instance of the TestVideoResult model
            video_result = TestVideoResult(
                test_id=test_id,
                video_url=video_url,
                video_title=video_title,
                similarity_score=similarity_score,
            )

            # Save the instance to the database
            video_result.save()


        # Return a success message or any other response
        response_data = {
            'message': 'Data stored successfully.'
        }
        return JsonResponse(response_data)
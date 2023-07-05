from django.shortcuts import render
import h5py
import numpy as np
import pandas as pd
import openai
from django.http import JsonResponse
from recommendations.models import *
from django.views.decorators.csrf import csrf_exempt
import unicodedata
import re
import json
from django.shortcuts import get_object_or_404
import string


openai.api_key = "sk-apikey to be updated here"

from openai.embeddings_utils import (
    get_embedding,
    distances_from_embeddings,
)

# constants
EMBEDDING_MODEL = "text-embedding-ada-002"

df = pd.read_csv("yt_videos_meta.csv")


# Load the HDF5 file with stored embeddings
with h5py.File('embeddings.h5', 'r') as hdf5_file:
    embeddings = hdf5_file['embeddings'][:]


# Compute cosine similarity between the input embedding and the stored embeddings
def compute_similarity(input_embedding, stored_embeddings):
    
    similarities = cosine_similarity([input_embedding], stored_embeddings)
    return similarities


def embedding_from_string(string: str, model: str = EMBEDDING_MODEL) -> list:
    """Return embedding of given string by requesting it via the API."""
    embedding = get_embedding(string, model)
    return embedding

def cosine_similarity_f(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm1 = np.linalg.norm(vector1)
    norm2 = np.linalg.norm(vector2)
    similarity = dot_product / (norm1 * norm2)
    return similarity
    
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

def calculate_similarity(embedding1, embedding2):
    """Calculate cosine similarity between two embeddings."""
    similarity_score = cosine_similarity([embedding1], [embedding2])[0][0]
    return similarity_score

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
        ee_llm = preprocess_text(json_data['ee_llm'])
        dp_llm = preprocess_text(json_data['dp_llm'])
        pa_llm = preprocess_text(json_data['pa_llm'])
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
        overext = pd.concat([ee_llm_oe, dp_llm_oe, pa_llm_oe]).drop_duplicates()

        # Display only 'Video_URL', 'Video_Title', and 'Similarity Score'
        overext = overext[['Video_URL', 'Video_Title', 'Similarity Score']]

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

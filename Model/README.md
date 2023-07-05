# 1. YouTube Video Data Scraper

This project is a YouTube video data scraper that allows you to search for videos based on specific keywords and retrieve their metadata. It utilizes the YouTube Data API v3 to fetch video information such as title, channel name, view count, likes, dislikes, comments, duration, category, tags, and more.

## File Name
YouTube_Video_Scrapping (1).ipynb

## Requirements

To run this project, you need to have the following installed:

- Python 3.x
- Required libraries: `os`, `time`, `isodate`, `requests`, `datetime`, `warnings`, `google.auth`, `pandas`, `bs4`, `googleapiclient.errors`, `google_auth_oauthlib.flow`, `googleapiclient.discovery`

## Setup

1. Get a Google API Key:
   - Go to the [Google Developer Console](https://console.developers.google.com/).
   - Create a new project or select an existing one.
   - Enable the YouTube Data API v3.
   - Generate an API Key.

2. Clone the repository:
   ```shell
   git clone https://github.com/your-username/your-repository.git

## Steps to Pull Data
1. Install the required dependencies:
```shell
pip install -r requirements.txt
```

2. Replace the DEVELOPER_KEY variable in the code with your generated API Key:
```python
DEVELOPER_KEY = "YOUR_API_KEY"
```
3. Customize the search keywords and the number of videos to be scraped in the code:
```
python
keywords = [
    "Emotional exhaustion",
    "Stress reduction and burnout",
    ...
]
no_of_videos_to_be_scrapped = 30
```
## Usage
Run the Python script to start scraping YouTube video data:

```shell
python youtube_scraper.py
```
The script will search for videos based on the specified keywords and retrieve their metadata. The scraped data will be stored in a CSV file named yt_videos_meta.csv.

# 2. Burnout Video Recommender System

## Introduction
This project implements a Burnout Video Recommender System that suggests videos to help individuals reduce emotional exhaustion, depersonalization, and increase personal achievement. The system utilizes Natural Language Processing (NLP) techniques and BERT-based sentence embeddings to find relevant videos from a dataset.

## File Name
cosine_similarity.ipynb

## Dependencies
The following libraries are required to run the code:

- pandas
- scikit-learn
- nltk
- sentence_transformers
You can install these dependencies using the following command:
```bash
pip install pandas scikit-learn nltk sentence_transformers
```

## Instructions

1. Clone the repository to your local machine.

2. Install the required dependencies:
   ```bash
   pip install pandas nltk sentence_transformers
'''
## Usage
1. Clone the repository to your local machine.
2. Install the required dependencies as mentioned above.
3. Place the dataset file "8_June_Unique.csv" in the project directory.
4. Open a terminal or command prompt and navigate to the project directory.
5. Run the "cosine_similarity.ipynb" script.

## Code Description
This script reads the dataset, applies preprocessing to the text data, and calculates cosine similarities between the video descriptions and LLM generated concise paragraphs for each burnout dimension (emotional exhaustion, depersonalization, and personal achievement). The script then generates a CSV file with the top recommended videos based on the similarity scores.

## Results and Output
The script generates a CSV file named "CR_HHH_bad_F.csv" containing the top 9 recommended videos for burnout reduction and personal achievement. The CSV file includes the search term, video URL, video title, video description, total views, and cosine similarity score.


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
   git clone https://github.com/LAPPS-ISB-Group9/Model.git

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

1. Clone the repository:
   ```shell
   git clone https://github.com/LAPPS-ISB-Group9/Model.git
   ```

3. Install the required dependencies:
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

# 3. Model Evaluation

# Description

This code analyzes feedback data from a PostgreSQL database and performs various calculations and analyses. It uses Python and several libraries, including pandas, numpy, psycopg2, sqlalchemy, and textblob.

## File Name
ph_model_evaluation.ipynb

## Getting Started

To run this code, make sure you have the following prerequisites:

- Python (version 3.6 or later)
- PostgreSQL database
- Required Python libraries (mentioned in the 'requirements.txt' file)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LAPPS-ISB-Group9/Models.git
   ```

## Usage
1. Install the required libraries:

   ```bash
   pip install -r requirements.txt
   ```
2.  Update the database connection details in the code:

  ```python
host = 'your-hostname'
port = 'your-port'
db = 'your-database-name'
user = 'your-username'
password = 'your-password'
  ```
3. Run the code:
   ```bash
   python ph_model_evaluation.ipynb
   ```
## Output

### 1. Sentiment Analysis
- Calculates the sentiment polarity of each feedback entry using TextBlob library.
- Categorizes feedback into positive, negative, or neutral based on sentiment polarity.
- Displays the count and percentage of feedback entries by sentiment category.

### 2. Rating Analysis
- Calculates the count of each rating.
- Converts the rating column to a numeric type.
- Defines positive recommendations as ratings of 4 or 5.
- Calculates True Positives (TP), False Positives (FP), False Negatives (FN), Precision, and Recall.
- Calculates relevance scores based on ratings.
- Calculates Discounted Cumulative Gain (DCG), Ideal DCG (IDCG), and Normalized DCG (NDCG).
- Calculates average NDCG.

### 3. User-based Rating Analysis
- Groups the data by user_id and calculates DCG, IDCG, and NDCG.
- Calculates the average NDCG across all users.

### 4. Precision and Average Precision Analysis
- Defines relevant items based on ratings.
- Calculates precision, average precision, and Mean Average Precision (MAP).

### 5. Feedback Analysis by Rating
- Groups the feedback data by rating and concatenates the feedback text.
- Displays the feedback for each rating.

### 6. Video Rating Analysis
- Fetches data from the 'assesments_rating' table.
- Calculates the mean like-dislike ratio and counts of each rating.
- Identifies the most liked and disliked videos.
- Identifies videos with high disagreement among ratings.


# 4. Embedding Generation

## Description
This code performs text preprocessing, embedding generation, and similarity search using embeddings for a given dataset. It utilizes various libraries and techniques for text processing, including pandas, openai, numpy, h5py, scikit-learn, nltk, and BeautifulSoup.

## File Name
ph_recommendation (1).ipynb

## Requirements
To run this code, you need the following libraries:

- pandas
- openai
- numpy
- h5py
- scikit-learn
- nltk
- BeautifulSoup

You can install these libraries using the following command:

   ```python
pip install pandas openai numpy h5py scikit-learn nltk beautifulsoup4
   ```
You also need to download the required NLTK resources by running the following code once:
   ```python
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
   ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LAPPS-ISB-Group9/Models.git
   ```

2. Set OpenAI API Key: Replace the value of openai.api_key variable with your OpenAI API key. You can obtain an API key by signing up for OpenAI services.

3. Provide Data: Ensure that you have a source containing the dataset. Update the file path in the code if needed.

4. Run the Code: Simply run the code, and it will perform the necessary text preprocessing, embedding generation, and similarity search. The results will be printed to the console and stored in output CSV files.

## Usage
1. Preprocessing and Embedding Generation:

The code preprocesses the dataset by combining the 'Video_Title' and 'Video_Description' columns, applies text preprocessing techniques (removing URLs, HTML tags, punctuation, emojis, converting to lowercase, removing stopwords, and lemmatization), and generates embeddings for each text using OpenAI's text embedding model.

2. Similarity Search:

The code allows you to perform a similarity search by providing an external input text. It preprocesses the input, computes its embedding, calculates cosine similarity scores between the input embedding and all stored embeddings, and retrieves the top-k most similar rows from the dataset based on similarity scores.

## Output:

The code outputs two CSV files:

Profile-BURNOUT.csv: Contains the top-k rows related to burnout based on similarity search.
Profile-OverExt.csv: Contains the top-k rows related to overextension based on similarity search.
The CSV files include columns such as 'Video_URL', 'Video_Title', 'domain', and 'Similarity Score'.



# 5. Video Recommendation - Tensorflow

## Description
This is a recommendation system that suggests videos related to burnout based on the user's input. It utilizes natural language processing and machine learning techniques to analyze video descriptions and titles, and recommends the most relevant videos.

## File Name
tf_ph_recommend.ipynb

## Requirements
To run this system, you need the following dependencies:

- Python (version 3.6 or higher)
- Pandas (version 1.2.4 or higher)
- NLTK (version 3.6.2 or higher)
- Scikit-learn (version 0.24.2 or higher)
- Sentence Transformers (version 1.2.0 or higher)
- TensorFlow (version 2.5.0 or higher)
- TensorFlow Hub (version 0.12.0 or higher)
- NumPy (version 1.21.0 or higher)
- Beautiful Soup (version 4.9.3 or higher)

You can install these dependencies using pip:
 ```python
pip install pandas nltk scikit-learn sentence-transformers tensorflow tensorflow-hub numpy beautifulsoup4
 ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LAPPS-ISB-Group9/Models.git
   ```
2. Download NLTK resources by running the following Python code:

   ```python
import nltk

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
      ```

### Usage
1. Prepare the input data:
   - Create a CSV file named yt_videos_meta.csv with the relevant video metadata. Ensure that it contains columns for Video_Title, Video_Description, Video_Length, Total_Views, and Video_URL.

2. Configure the burnout domains and levels:
   - Update the ee_level, dp_level, and pa_level variables in the main script to specify the desired burnout levels for each domain.

3. Run the main script:
 - Execute the main script to generate video recommendations based on the provided burnout domains and levels.

4. View the recommended videos:
   - The system will output a list of recommended videos based on the specified burnout domains and levels. The videos will be sorted by relevance and filtered based on minimum view count criteria.

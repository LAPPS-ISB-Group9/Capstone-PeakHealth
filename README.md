# YouTube Video Data Scraper

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

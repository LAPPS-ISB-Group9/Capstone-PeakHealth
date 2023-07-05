# Capstone Peakhealth

## Project Description
This Git repository contains the code for a project that involves a backend built with Django, a frontend app developed in React, and a recommendation engine and data pipeline using the YouTube API to a PostgreSQL database.

## Folder Structure
The repository is organized into the following folders:
1. **Backend**: Contains the code related to the backend implementation built with Django.
2. **Frontend**: Includes the code for the frontend app developed using React.
3. **Recommendation Engine**: Contains the code for the recommendation engine and data pipeline, which utilize the YouTube API to extract data and store it in a PostgreSQL database.

## Prerequisites and Installation Setup
To run this project, ensure that you have the following prerequisites installed:

### Backend:
- Python 3.x
- Django
- PostgreSQL

To set up the backend, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the `Backend` folder.
3. Install the required Python packages by running the following command:
   ```shell
   pip install -r requirements.txt
   ```
4. Set up the PostgreSQL database and update the configuration in the project settings.
5. Run the Django migrations using the following command:
  ```shell
   python manage.py migrate
   ```
6. Start the Django development server with the following command:
   ```shell
   python manage.py runserver
   ```


### Frontend:
- Node.js
- npm or yarn

To set up the frontend, follow these steps:
1. Navigate to the `Frontend` folder.
2. Install the required packages by running the following command:
   ```shell
   npm install
   ```
   or
   ```shell
   yarn install
   ```
3. Update the necessary configuration files if required.
4. Start the React development server with the following command:
   ```shell
   npm start
   ```


### Recommendation Engine and Data Pipeline:
- Python 3.x
- PostgreSQL

To set up the recommendation engine and data pipeline, follow these steps:
1. Navigate to the `Recommendation Engine` folder.
2. Install the required Python packages by running the following command:
   ```shell
   pip install -r requirements.txt
   ```
3. Update the configuration files to provide the necessary API credentials and database connection details.
4. Execute the scripts or run the application as per the provided instructions.

## Project Workflow
1. Start by setting up the backend and ensuring it is running correctly.
2. Then, set up the frontend and verify that it is functioning properly.
3. Proceed with configuring and running the recommendation engine and data pipeline.
4. Ensure that the necessary connections and integrations between the backend, frontend, and recommendation engine are established and functional.
5. Test the entire system to verify its performance and functionality.
6. Make any required adjustments or improvements based on testing results.
7. Continue to develop and iterate on the project as needed.

## Additional Features
You can add any additional features or improvements to this project by following these steps:
1. Fork this repository.
2. Create a new branch for your feature or improvement.
3. Implement your changes and test them thoroughly.
4. Commit and push your changes to your forked repository.
5. Submit a pull request, explaining the changes you have made and the reasons behind them.

## Conclusion
This repository contains the code for a project consisting of a Django backend, React frontend, and a recommendation engine with a data pipeline utilizing the YouTube API and a PostgreSQL database. By following the provided instructions, you can set up the project on your local machine and start working on it. Feel free to contribute by adding additional features or improvements. If you encounter any issues or have any


   





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

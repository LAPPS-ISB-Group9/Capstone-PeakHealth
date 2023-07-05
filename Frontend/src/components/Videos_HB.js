import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./css/VideoRecommendation.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoRecommendationHighB = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [rating, setRating] = useState(0);


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const testId = localStorage.getItem('test_id');
        // const testId = 1
        const response = await axios.get(`https://ph-django.vercel.app/get_videos/${testId}/`);
        setVideoList(response.data.videos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
  
    fetchVideoData();
  }, []);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= videoList.length ? 0 : newIndex;
    });
    setClickCount((prevCount) => prevCount + 1);
    setRating(0);
  };

  const handleVideoSelection = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
    setRating(0);
  };

  const handleCompleteTraining = () => {
    navigate(`/thankyou?clickCount=${clickCount}`);
  };

  // const handleRating = (selectedRating) => {
  //   setRating(selectedRating);
  // };

  const handleRating = async (selectedRating) => {
    try {
      const userId = localStorage.getItem('user_id');
      const testId = localStorage.getItem('test_id');
      const videoUrl = videoList[currentVideoIndex].Video_URL;
      const rating = selectedRating === 1 ? 1 : 0; // Convert selectedRating to 1 for "like" or 0 for "dislike"
      const data = {
        test_id: testId,
        user_id: userId,
        video_url: videoUrl,
        rating: rating,
      };
      await axios.post('https://ph-django.vercel.app/save_rating/', data);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
    setRating(selectedRating === 1 ? 1 : -1); // Set rating state to 1 for "like" or -1 for "dislike"
  };

  const youtubeOpts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="video-recommendation-container">
      <div className="video-player">
        <h3>Videos Recommended Based on Burnout</h3>
        {videoList.length > 0 && (
          <YouTube
            videoId={videoList[currentVideoIndex].Video_URL.split("=")[1]}
            opts={youtubeOpts}
            className="youtube-player"
          />
        )}
        <div className="video-controls">
          <div className="feedback">
            <button
                className={`like-button ${rating === 1 ? 'active' : ''}`}
                onClick={() => handleRating(1)}
                >
                {/* <FontAwesomeIcon icon={faThumbsUp} /> Like */}
                Like
            </button>
            <button
                className={`dislike-button ${rating === -1 ? 'active' : ''}`}
                onClick={() => handleRating(-1)}
                >
                {/* <FontAwesomeIcon icon={faThumbsDown} /> Dislike */}
                Dislike
            </button>
            <button className="next-button" onClick={handleNextVideo}>
                Next
            </button>
        </div>
        </div>
        <button className="complete-training-button" onClick={handleCompleteTraining}>
          Complete Training
        </button>
      </div>
      <div className="video-list">
        {videoList.map((video, index) => (
          <div
            key={index}
            className={`video-item ${index === currentVideoIndex ? "active" : ""}`}
            onClick={() => handleVideoSelection(index)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.Video_URL.split("=")[1]}/mqdefault.jpg`}
              alt={video.Video_Title}
              className="thumbnail"
            />
            <div className="video-description">{video.Video_Title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendationHighB;

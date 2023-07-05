import React, { useState } from "react";
import YouTube from "react-youtube";
import "./css/VideoRecommendation.css";
import { useNavigate } from 'react-router-dom';

const VideoRecommendation = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);


  const videoList = [
    // { id: 1, title: 'Video 1', videoId: 'FYIDBhtSuzw' },
    { id: 2, title: 'Developing Empathy - Conscious Discipline Skills', videoId: 'P56f8v-DRTY' },
    { id: 3, title: 'IMPACT AND COPING STRATEGIES FOR STRESS MGMT ORGANIZATION BEHAVIOR', videoId: '-tTddeb-OW0' },
    { id: 4, title: '6 Signs You are BurntOut, Not Lazy', videoId: 'MLuJ249WnkE' },
    { id: 5, title: '4 Time Management Tips For Work-Life Balance', videoId: 'XJeajmVButM' },
    { id: 6, title: 'Burnout: Symptoms & Strategies', videoId: '3FMVECPf5is' },
    { id: 7, title: 'Simon Sinek - Understanding Empathy.', videoId: 'pi86Nr9Mdms' },
    { id: 8, title: '20 Minute Guided Meditation to Build Emotional Resilience | Experience Inner Peace and Clarity', videoId: 'gF8uzDcbXj4' },
    { id: 9, title: 'Day 24 - Rejuvenate |  BREATH - A 30 Day Yoga Journey', videoId: 'd1jKp2mZkSQ' },
    { id:10, title: 'Coping With Stress & Caring for Mental Health During COVID-19', videoId: 'UE_H9QhGktE'}
    // Add more video objects as needed
  ];

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= videoList.length ? 0 : newIndex;
    });
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleVideoSelection = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };


  const handleCompleteTraining = () => {
    navigate(`/thankyou?clickCount=${clickCount}`);
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
      <h3>Videos Recommended Based on Burnout </h3>
        <YouTube
          videoId={videoList[currentVideoIndex].videoId}
          opts={youtubeOpts}
          className="youtube-player"
        />
        <h3>{videoList[currentVideoIndex].title}</h3>
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
        <button className="complete-training-button" onClick={handleCompleteTraining}>
            Complete Training
            </button>
        </div>
        
        
      </div>
      {/* <div className="video-details">
        
      </div> */}
      <div className="video-list">
        {videoList.map((video, index) => (
          <div
            key={video.id}
            className={`video-item ${index === currentVideoIndex ? "active" : ""}`}
            onClick={() => handleVideoSelection(index)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
              alt={video.title}
              className="thumbnail"
            />
            <div className="video-description">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendation;

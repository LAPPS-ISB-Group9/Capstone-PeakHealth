import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/Thankyou.css"; // Path to your CSS file
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const clickCount = params.get("clickCount");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState(null);
  

  const navigate = useNavigate();

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    const storedTestId = localStorage.getItem('test_id');
    console.log(storedUserId)
    const feedbackData = {
      user: storedUserId, // Replace with the actual user ID
      test_id: storedTestId,
      rating: rating,
      feedback: feedback,
      status: "Active",
    };

    try {
      const response = await axios.post("https://ph-django.vercel.app/feedback/", feedbackData);
      console.log("Feedback submitted successfully:", response.data);
      // Handle any additional logic or UI updates upon successful submission
      navigate('/');
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      // Handle any error cases or show an error message to the user
    }
  };

  const calculateProgress = () => {
    const totalVideos = 10; // Total number of videos in the training
    const progress = (clickCount / totalVideos) * 100;
    return progress;
  };

  return (
    <div className="container">
      <h1 className="ty-h1">Thank You for Completing the Training!</h1>
      <p className="ty-p">Your progress on training.</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${calculateProgress()}%` }}>
          <p className="progress-text">
            Progress: {calculateProgress()}% ({clickCount} out of 10 videos completed)
          </p>
        </div>
      </div>
      <p className="ty-p">
        Follow and apply what you have learned in the training. We encourage you
        to revisit after 15 days to take the assessment again.
      </p>
      <div className="feedback-section">
        <div className="rating-box">
          <p>Rate this Training:</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "selected" : ""}`}
                onClick={() => handleRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="feedback-form-t">
        <input
          type="text"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={handleFeedback}
        />
        <button className="submit-feedback-button" onClick={handleSubmitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default ThankYou;

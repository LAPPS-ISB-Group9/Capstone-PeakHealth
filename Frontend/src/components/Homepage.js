import React from 'react';
import './css/Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleExperienceNowClick = () => {
    navigate('/');
  };
  
  return (
    <div className="homepage-container">
      <div className="content-wrap">
        <div className="content-column">
          <h1 className="homepage-title">Revitalize Your Workforce,</h1>
          <h1 className="homepage-title">Reignite Your Business.</h1>
          <p className="homepage-paragraph">
            Experience how our AI technology can help you reduce burnout and improve employee wellness and productivity.
          </p>
          <p> Please login </p>
          <div className="homepage-button">
            <button className="homepage-btn" onClick={handleExperienceNowClick}>Experience Now</button>
          </div>
        </div>
        <div className="image-column">
          <img src="https://peakhealth.tech/wp-content/uploads/2023/04/Frame-2-903x1024.png" alt="placeholder" className="homepage-image" />
          <p className="homepage-image-caption">The Costs of Burnout</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

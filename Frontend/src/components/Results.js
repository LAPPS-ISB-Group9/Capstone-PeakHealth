import React, { useState, useEffect } from 'react';
import './css/Results.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import { OpenAI } from "langchain/llms/openai";
import axios from 'axios';


const Results = () => {
    const { sectionTotals } = useParams();
    const [emotionalExhaustionScore, setEmotionalExhaustionScore] = useState(null);
    const [depersonalisationScore, setDepersonalisationScore] = useState(null);
    const [personalAchievementScore, setPersonalAchievementScore] = useState(null);
    const [generatedParagraphs, setGeneratedParagraphs] = useState([]);
    const [summaryGenerated, setSummaryGenerated] = useState(false);
    const navigate = useNavigate();
    

    const handleRecommendVideosClick = () => {
      const testId = localStorage.getItem('test_id');
      const ee_llm = generatedParagraphs[0].content;
      const dp_llm = generatedParagraphs[1].content;
      const pa_llm = generatedParagraphs[2].content;
      const ee_levell = getBurnoutLevel(emotionalExhaustionScore, 17, 30);
      const dp_levell = getBurnoutLevel(depersonalisationScore, 5, 12);
      const pa_levell = getBurnoutLevelPa(personalAchievementScore, 33, 40);
      // Function to extract the high-level indicator
      function extractHighLevelIndicator(level) {
        const splitWords = level.split("-");
        return splitWords[0].trim();
      }

      // Example scenarios
      const ee_level = extractHighLevelIndicator(ee_levell);
      const dp_level = extractHighLevelIndicator(dp_levell);
      const pa_level = extractHighLevelIndicator(pa_levell);

      console.log(ee_level);
      console.log(dp_level);
      console.log(pa_level);
      const requestData = {
        test_id: testId,
        ee_llm,
        dp_llm,
        pa_llm,
        ee_level,
        dp_level,
        pa_level
      };

      axios.post('https://mercor-387320.el.r.appspot.com/video/recommend/', requestData)
        .then(response => {
          console.log('Recommendation response:', response.data);
          navigate('/videoshigh');
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Failed to recommend videos:', error);
          // Handle the error as needed
      });
        
      
      
      
    };

    useEffect(() => {
      
      const regex = /\d+/g; // Regular expression to match numbers
      const totalsArray = sectionTotals?.match(regex);
      if (totalsArray && totalsArray.length >= 3) {
        setEmotionalExhaustionScore(totalsArray[0]);
        setDepersonalisationScore(totalsArray[1]);
        setPersonalAchievementScore(totalsArray[2]);
      }
    }, [sectionTotals]);
    if (sectionTotals === undefined) {
      return null; // Handle case when sectionTotals is undefined
    }
    console.log(sectionTotals)
    console.log(emotionalExhaustionScore)
    
  

  const getBurnoutLevel = (score, lowThreshold, highThreshold) => {
    if (score <= lowThreshold) {
      return 'Low-level burnout';
    } else if (score > lowThreshold && score < highThreshold) {
      return 'Moderate-level burnout';
    } else {
      return 'High-level burnout';
    }
  };

  const getBurnoutLevelPa = (score, lowThreshold, highThreshold) => {
    if (score <= lowThreshold) {
      return 'High-level burnout';
    } else if (score > lowThreshold && score < highThreshold) {
      return 'Moderate-level burnout';
    } else {
      return 'Low-level burnout';
    }
  };

  const getScoreBoxColorPa = (score, lowThreshold, highThreshold) => {
    if (score <= lowThreshold) {
      return '#FF6863';
    } else if (score >= highThreshold) {
      return '#90EE90';
    } else {
      return 'orange';
    }
  };

  const getScoreBoxColor = (score, lowThreshold, highThreshold) => {
    if (score <= lowThreshold) {
      return '#90EE90';
    } else if (score >= highThreshold) {
      return '#FF6863';
    } else {
      return 'orange';
    }
  };
  
  const handleGenerateSummaryClick = () => {
    const storedTestId = localStorage.getItem('test_id');
    console.log(storedTestId)
    axios.get(`https://ph-django.vercel.app/test-paragraphs/${storedTestId}/`)
      .then(response => {
      const { para_ee, para_dp, para_pa } = response.data;
      // setGeneratedParagraphs([para_ee, para_dp, para_pa]);
      setGeneratedParagraphs([
        { title: 'Emotional Exhaustion', content: para_ee },
        { title: 'Depersonalisation', content: para_dp },
        { title: 'Personal Achievement', content: para_pa },
      ]);
      console.log(para_ee, para_dp, para_pa);
      })
      .catch(error => {
        console.error('Failed to fetch generated paragraphs:', error);
      });
      setSummaryGenerated(true);
  };


  return (
    <div className="results-container">
      <div className="section-scores">
        <div className="score-box" style={{ backgroundColor: getScoreBoxColor(emotionalExhaustionScore, 17, 30) }}>
          <h2>Emotional Exhaustion Score</h2>
          <p>{emotionalExhaustionScore}</p>
          <p>{getBurnoutLevel(emotionalExhaustionScore, 17, 30)}</p>
          <p>
            High: &gt;= 30<br />
            Moderate: &gt;= 18 and &lt;= 29<br />
            Low: &lt;= 17
          </p>
        </div>
        <div className="score-box" style={{ backgroundColor: getScoreBoxColor(depersonalisationScore, 5, 12) }}>
          <h2>Depersonalisation Score</h2>
          <p>{depersonalisationScore}</p>
          <p>{getBurnoutLevel(depersonalisationScore, 5, 12)}</p>
          <p>
            High: &gt;= 12<br />
            Moderate: &gt;= 6 and &lt;= 11<br />
            Low: &lt;= 5
          </p>
        </div>
        <div className="score-box" style={{ backgroundColor: getScoreBoxColorPa(personalAchievementScore, 33, 40) }}>
          <h2>Personal Achievement Score</h2>
          <p>{personalAchievementScore}</p>
          <p>{getBurnoutLevelPa(personalAchievementScore, 33, 40)}</p>
          <p>
            High: &lt;= 33<br />
            Moderate: &gt;= 34 and &lt;= 39<br />
            Low: &gt;= 40
          </p>
        </div>
      </div>
      <button className="videos-button" onClick={handleGenerateSummaryClick}>Generate Summary</button>
      <div className="ai-generated-paragraph">
        {generatedParagraphs.map((paragraph, index) => (
          <div key={index}>
            <h3>{paragraph.title}</h3>
            <p>{paragraph.content}</p>
          </div>
        ))}
      </div>
      
      <button
        className="videos-button"
        onClick={handleRecommendVideosClick}
        disabled={!summaryGenerated} // Disable the button if summaryGenerated is false
      >
        Recommend Videos
      </button>
      <p>Please click on Generate Summary to view Personalised Summary</p>
      <p>Click on Recommend Videos to view Personalised Recommendation based on Burnout</p>
    </div>
    
  );
};

export default Results;

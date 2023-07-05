import React from "react";
import "./css/Comparison.css";

const PreviousScoresComponent = () => {
  const previousScores = [
    { category: "Emotional Exhaustion", score: 30 },
    { category: "Depersonalization", score: 3 },
    { category: "Personal Achievement", score: 25 },
  ];

  const currentScores = [
    { category: "Emotional Exhaustion", score: 25 },
    { category: "Depersonalization", score: 13 },
    { category: "Personal Achievement", score: 18 },
  ];

  return (
    <div className="previous-scores-container">
      <h2>Compare Test Scores</h2>
      <div className="left-side">
        <h3>Current Attempt Scores</h3>
        <div className="score-box-c">
          {previousScores.map((score, index) => (
            <div key={index} className="score-item">
              <h4>{score.category}</h4>
              <p>{score.score}</p>
            </div>
          ))}
        </div>
        <p>
          The employee is feeling emotionally drained by their work on a monthly basis, frustrated once a month, and overwhelmed by the amount of effort it takes to work with people every day. 
          They feel like they are working too hard once a week and that the stress of working in direct contact with people is taking a toll on them a few times per week. They feel like they are at the end of their tether once a week.
        </p>
      </div>
      <div className="right-side">
        <h3>Previous Attempt Scores</h3>
        <div className="score-box-c">
          {currentScores.map((score, index) => (
            <div key={index} className="score-item">
              <h4>{score.category}</h4>
              <p>{score.score}</p>
            </div>
          ))}
        </div>
        <p>
          The employee is feeling overwhelmed and exhausted by their work, as they feel emotionally drained and feel like their work is breaking them down. They are frustrated and feel like they are working too hard, as it is stressful to work in direct contact with people. They feel like they are at the end of their tether, as this happens once a month, every day, once a week and a few times per week.
        </p>
      </div>
    </div>
  );
};

export default PreviousScoresComponent;

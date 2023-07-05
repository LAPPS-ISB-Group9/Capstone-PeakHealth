import React, { useState, useEffect } from 'react';
import './css/Assesment.css';
import Results from './Results';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sectionTotals, setSectionTotals] = useState([]);
  const [userId, setUserId] = useState(null);
  const [formattedAnswers, setFormattedAnswers] = useState([]);
  const [generatedParagraphs, setGeneratedParagraphs] = useState([]);

  const navigate = useNavigate();
  
  const paragraphs = [];
  const generateParagraphs = () => {
    
    const sectionsCount = sections.length;
  
    // Iterate through sections and questions
    for (let i = 0; i < sectionsCount; i++) {
      const section = sections[i];
      const questions = section.questions;
      const questionsCount = questions.length;
      let paragraph = '';
  
      for (let j = 0; j < questionsCount; j++) {
        const question = questions[j];
        const answer = answers[i][j];
  
        // Generate paragraph based on the question and answer
        paragraph += `${question.question} - ${answer}..`;
      }
  
      paragraphs.push(paragraph);
    }
    setGeneratedParagraphs(paragraphs);
  };
  
  

  const generateTestId = () => {

    return uuidv4();

  };


  const handleRedirectToResults = (sectionTotals) => {

    const url = `/results/$${sectionTotals}}`;
    navigate(url);

  };

  const handleNext = async () => {
    if (currentQuestion === sections[currentSection].questions.length - 1) {
      if (currentSection === sections.length - 1) {
        // Last question of the last section
        // Check if all questions are answered before submitting
        const isAssessmentComplete = checkAssessmentCompletion();
        if (isAssessmentComplete) {
          const sectionTotals = calculateSectionTotals();
          setSectionTotals(sectionTotals);
          const testId = generateTestId(); // generate a unique test ID (e.g., using UUID)
          // const userId = localStorage.getItem('user_id');; // replace with the actual user ID
          const storedUserId = localStorage.getItem('user_id');
          setUserId(storedUserId);
          console.log(userId)
          console.log(storedUserId)
          const eeScore = sectionTotals[0];
          const dpScore = sectionTotals[1];
          const paScore = sectionTotals[2];
          const answersData = [];

          for (let i = 0; i < sections.length; i++) {
            const sectionId = i + 1;
            const questions = sections[i].questions;
            for (let j = 0; j < questions.length; j++) {
              const questionId = j + 1;
              const answer = answers[i][j];
              answersData.push({
                section_id: sectionId,
                question: questionId,
                answer: answerValueMapping[answer],
              });
            }
          }

          const requestData = {
            test_id: testId,
            user_id: storedUserId,
            ee_score: eeScore,
            dp_score: dpScore,
            pa_score: paScore,
            answers: answersData,
          };
          
          generateParagraphs();

          try {
            console.log(requestData)
            const response = await axios.post('https://ph-django.vercel.app/test-records/', requestData);
            // const response = await axios.post('http://localhost:8000/test-records/', requestData);
            const { test_id } = response.data;
            localStorage.setItem('test_id', test_id);
            console.log('Assessment results saved successfully');
            const storedTestId = localStorage.getItem('test_id');
            const data = {
              test_record: storedTestId,
              para_ee: paragraphs[0],
              para_dp: paragraphs[1],
              para_pa: paragraphs[2],
            };
            // Send the data to the API
            axios.post('https://ph-django.vercel.app/api/testparagraphs/', data)
              .then(response => {
                // Handle the API response if needed
                console.log(response.data);
              })
              .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error:', error);
              });
            
            handleRedirectToResults(sectionTotals);
          } catch (error) {
            console.error('Error saving assessment results', error);
            // Handle error, show error message, etc.
          }
        } else {
          alert('Please answer all the questions before submitting.');
        }
        return;
      }
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      if (currentSection === 0) return;
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (event) => {
    const { value } = event.target;
    const updatedAnswers = [...answers];
    updatedAnswers[currentSection][currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const handleSectionChange = (index) => {
    setCurrentSection(index);
    setCurrentQuestion(0); // Reset currentQuestion to 0 when switching sections
  };

  const checkAssessmentCompletion = () => {
    for (const section of answers) {
      for (const answer of section) {
        if (answer === '') {
          return false;
        }
      }
    }
    return true;
  };

  const calculateSectionTotals = () => {
    const sectionTotals = sections.map((section) => 0);
    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i].questions.length; j++) {
        const answer = answers[i][j];
        const answerValue = answer ? answerValueMapping[answer] : 0;
        sectionTotals[i] += answerValue;
      }
    }
    return sectionTotals;
  };

  useEffect(() => {
    const initialAnswers = sections.map((section) =>
      new Array(section.questions.length).fill('')
    );
    setAnswers(initialAnswers);
  }, []);

  const sections = [
    {
      name: 'Emotional Exhaustion',
      questions: [
        {
            question: 'I feel emotionally drained by my work.',
            options: [
                "Never",
                "Once a week",
                "A few times per month",
                "Once a month",
                "A few times per week",
                "Every day",
                "A few times per year",
              ],
          },
        {
            question:
              "Working with people all day long requires a great deal of effort.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I feel like my work is breaking me down",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I feel frustrated by my work",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I feel I work too hard at my job.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "It stresses me too much to work in direct contact with people.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I feel like I am at the end of my tether.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
        // ... other questions
      ],
    },
    {
      name: 'Depersonalisation',
      questions: [
        {
          question:
            'I feel I deal with my team/colleagues impersonally, as if they are objects',
          options: [
            'Never',
            'Once a week',
            'A few times per month',
            'Once a month',
            'A few times per week',
            'Every day',
            'A few times per year',
          ],
        },
        {
            question:
              "I feel tired when I get up in the morning and have to face another day at work.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "I have the impression that my team/colleagues make me responsible for some of their problems.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I am at the end of my patience at the end of my work day.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "I really do not care about what happens to some of my team/colleagues.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I have become more insensitive to people in the workplace.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I am afraid that this job is making me uncaring.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
        // ... other questions
      ],
    },
    {
      name: 'Personal Achievement',
      questions: [
        {
          question: 'I accomplish many worthwhile things in this job.',
          options: [
            'Never',
            'Once a week',
            'A few times per month',
            'Once a month',
            'A few times per week',
            'Every day',
            'A few times per year',
          ],
        },
        {
            question: "I feel full of energy",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "I am easily able to understand what my team/colleagues feel.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I look after my team/colleagues problems very effectively.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "In my work, I handle emotional problems very calmly.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "Through my work, I feel that I have a positive influence on people.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question:
              "I am easily able to create a relaxed atmosphere with my team/colleagues.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
          {
            question: "I feel refreshed when I have been close to my team/colleagues at work.",
            options: [
              "Never",
              "Once a week",
              "A few times per month",
              "Once a month",
              "A few times per week",
              "Every day",
              "A few times per year",
            ],
          },
        // ... other questions
      ],
    },
  ];

  const currentSectionQuestions = sections[currentSection].questions;
  const currentQuestionData = currentSectionQuestions[currentQuestion];
  const isLastSection = currentSection === sections.length - 1;
  const isLastQuestion = currentQuestion === currentSectionQuestions.length - 1;
  const isAllQuestionsAnswered = checkAssessmentCompletion();

  const answerValueMapping = {
    'Never': 0,
    'Once a week': 4,
    'A few times per month': 3,
    'Once a month': 2,
    'A few times per week': 5,
    'Every day': 6,
    'A few times per year': 1,
  };

  return (
    <div className="assessment-container">
      <h1 className="assessment-title">Burnout Self Assessment</h1>
      <div className="section-toggle">
      {sections.map((section, index) => (
        <button
            key={index}
            onClick={() => handleSectionChange(index)} // Call handleSectionChange instead of setCurrentSection
            className={currentSection === index ? 'active' : ''}
        >
            {section.name}
        </button>
        ))}
      </div>
      <div className="question-container">
        <h3>Question {currentQuestion + 1}</h3>
        <p className="question-text">{currentQuestionData.question}</p>
        {currentQuestionData.options && (
          <div className="answer-options">
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="option-label">
                <input
                  type="radio"
                  name={`answer-${currentSection}-${currentQuestion}`}
                  value={option}
                  checked={answers[currentSection]?.[currentQuestion] === option}
                  onChange={handleAnswer}
                />
                <label
                htmlFor={`answer-${currentSection}-${currentQuestion}-${index}`}
              >
                {option}
              </label>
                {/* <span className="option-text">{option}</span> */}
              </div>
            ))}
          </div>
        )}
        <div className="button-group">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0 && currentSection === 0}
          >
            Back
          </button>
          {isLastSection && isLastQuestion && isAllQuestionsAnswered ? (
                <>
                <button onClick={handleNext}>Submit</button>
                {sectionTotals.length > 0 && <Results sectionTotals={sectionTotals} />}
                </>
            ) : (
            <button onClick={handleNext}>Next</button>
          )}
          {/* <AssessmentResults generatedParagraphs={generatedParagraphs} /> */}
        </div>
      </div>
    </div>
  );
};


export default Assessment;

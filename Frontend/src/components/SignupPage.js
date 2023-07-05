import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/SignupPage.css';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [industry, setIndustry] = useState('');
  const [designation, setDesignation] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validate mandatory fields and handle errors

    // Validate mandatory fields
    if (!name || !gender || !age || !industry || !designation || !jobResponsibilities) {
      setErrorMessage('All fields are mandatory. Please fill in all the required fields.');
      return;
    }

    // Convert age to a number
    const ageNumber = Number(age);

    // Check if age is a valid number
    if (isNaN(ageNumber)) {
        setErrorMessage('Age must be a numeric value.');
        return;
    }

    // Create user object
    const newUser = {
      name,
      email,
      password,
      gender,
      age:ageNumber,
      industry,
      designation,
      job_responsibilities: jobResponsibilities,
    };

    // Make POST request to signup API endpoint
    console.log(newUser)
    axios
      .post('https://ph-django.vercel.app/signup/', newUser)
      .then((response) => {
        console.log('User signed up successfully:', response.data);
        // Redirect to login page
        navigate('/login');
      })
      .catch((error) => {
        // Handle Error
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Failed to create user. Please try again.');
        }
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="form-field">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-field">
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            </div>
            <div className="form-field">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-field">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
            </select>
            </div>
            <div className="form-field">
            <label>Age:</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="form-field">
            <label>Industry:</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Media">Media</option>
                <option value="Transportation">Transportation</option>
                <option value="Energy">Energy</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className="form-field">
            <label>Designation:</label>
            <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </div>
            <div className="form-field">
            <label>Job Responsibilities:</label>
            <input type="text" value={jobResponsibilities} onChange={(e) => setJobResponsibilities(e.target.value)} />
            </div>
            <div className="button-container">
            <button type="submit">Sign Up</button>
            </div>
            <p className="signup-text">
            Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

    </div>
  );
}

export default SignUpPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [job_responsibilities, setRoles] = useState('');
  const [industry, setIndustry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  // Retrieve user details from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  // Set initial values for form fields
  useEffect(() => {
    if (storedUser) {
      setName(storedUser.user.name);
      setGender(storedUser.user.gender);
      setAge(storedUser.user.age);
      setDesignation(storedUser.user.designation);
      setRoles(storedUser.user.job_responsibilities);
      setIndustry(storedUser.user.industry);
    }
  }, []);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create updated user object
    const updatedUser = {
      ...user,
      name,
      gender,
      age,
      designation,
      job_responsibilities,
      industry,
    };

    // Make POST request to updateuser API endpoint
    axios
      .post('http://localhost:3000/updateuser', updatedUser)
      .then((response) => {
        // Update user details in local storage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccessMessage('User details updated successfully.');
        setErrorMessage('');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Failed to update user details.');
      });
  };

  // Handle logout
  const handleLogout = () => {
    // Remove user details from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('test_id');
    // Redirect or perform any other action as needed
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      {user && (
        <div className="profile-details">
          <h3>Profile Details</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Designation:</strong> {user.designation}
          </p>
          <p>
            <strong>Roles:</strong> {user.job_responsibilities}
          </p>
          <p>
            <strong>Industry:</strong> {user.industry}
          </p>
        </div>
      )}
      <div className="update-details">
        <h3>Update Details</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Age:</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Designation:</label>
            <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Roles:</label>
            <input type="text" value={job_responsibilities} onChange={(e) => setRoles(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Industry:</label>
            <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
          <button type="submit">Update</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;

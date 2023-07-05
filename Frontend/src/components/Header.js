import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Header.css';

function Header() {
    // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, [location]);
  return (
    <header className="header-container">
      <div className="header-left">
        <img src="https://peakhealth.tech/wp-content/uploads/2023/04/logo-280x280-1.png" alt="Logo" className="header-logo" />
        <h1 className="header-title">PeakHealth</h1>
      </div>
      <nav className="header-nav">
        <ul className="header-list">
          <li className="header-list-item"><a href="/">Home</a></li>
          {isLoggedIn && (
            <>
              <li className="header-list-item"><Link to="/assesment">Assessment</Link></li>
              <li className="header-list-item"><Link to="/compare">Compare</Link></li>
            </>
          )}
          {/* <li className="header-list-item"><a href="assesment">Assessment</a></li>
          <li className="header-list-item"><a href="compare">Compare</a></li> */}
          <li className="header-list-item"><a href="/">Contact</a></li>
          {isLoggedIn ? (
            <li className="header-list-item"><a href="/profile">Profile</a></li>
          ) : (
            <li className="header-list-item"><a href="/login">Login/SignUp</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

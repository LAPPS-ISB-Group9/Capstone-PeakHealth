import React from 'react';
import './css//Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <ul className="footer-links">
        <li className="footer-link-item"><a href="/">Home</a></li>
        <li className="footer-link-item"><a href="/privacy">Privacy Policies</a></li>
      </ul>
      <p className="footer-text">&copy; 2023 Peak Health</p>
    </footer>
  );
};

export default Footer;

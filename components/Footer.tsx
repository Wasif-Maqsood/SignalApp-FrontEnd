import React from 'react';
import './css/Footer.css';
import logo from '../src/assets/signal-x-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Signal Bot" />
          <p>The Best AI Tool For Crypto Trading</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>About Us</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
          <div className="footer-column">
            <h3>Subscribe</h3>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Signal Bot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

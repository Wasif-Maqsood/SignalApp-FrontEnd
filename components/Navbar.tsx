import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar: React.FC<{ logo: string }> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Signal Bot" />
          <span className="logo-text">Signal Bot</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/demo" className="nav-link">Demo</Link>
            <Link to="/testimonials" className="nav-link">Testimonials</Link>
            <Link to="/news" className="nav-link">News</Link>
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="nav-link login">Login</Link>
          <Link to="/register" className="nav-link getting-started">Getting Started</Link>
        </div>

        <button 
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

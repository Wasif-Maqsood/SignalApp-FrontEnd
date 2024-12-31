import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './assets/signal-x-logo.svg';
import dashboard1 from './assets/signal-executive-logo.svg';
import dashboard2 from './assets/chart-1.jpg';
import dashboard3 from './assets/chart-1.jpg';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import WhyChooseUs from '../components/WhyChooseUs';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dashboardImages = [
    dashboard1,
    dashboard2,
    dashboard3
  ];

  return (
    <div className="app-container">
      <header className="header">
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <Navbar logo={logo} />
      </header>
      <main className="main-content">
        <div className="text-content">
          <h1>Trade Smarter with AI-Powered Insights</h1>
          <p>Experience the future of crypto trading with real-time signals, market analysis, and AI-driven recommendations.</p>
          <button className="primary-button">Start Trading Now</button>
        </div>
        <div className="image-content">
          <Carousel images={dashboardImages} />
        </div>
        <WhyChooseUs />
      </main>
    </div>
  );
};

export default App;

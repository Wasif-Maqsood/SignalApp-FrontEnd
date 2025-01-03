import React, { useState } from 'react';
import './App.css';
import logo from './assets/signal-x-logo.svg';
import dashboard1 from './assets/signal-executive-logo.svg';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import WhyChooseUs from '../components/WhyChooseUs';
import LiveSignals from '../components/LiveSignals';
import Footer from '../components/Footer';
import SectionSeparator from '../components/SectionSeparator';
import NetworkAnimation from '../components/NetworkAnimation';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dashboardImages = [
    dashboard1
  ];

  return (
    <>
      <div className="background-wrapper">
        <NetworkAnimation />
      </div>
      <div className="app-container">
        <header className="header">
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <Navbar logo={logo} />
        </header>
        <SectionSeparator />
        <main>
          <section className="hero-section main-content">
            <div className="text-content">
              <h1>Trade Smarter with AI-Powered Insights</h1>
              <p>Experience the future of crypto trading with real-time signals, market analysis, and AI-driven recommendations.</p>
              <button 
                className="primary-button" 
                onClick={() => window.location.href = '/register'}
              >
                Start Trading Now
              </button>

            </div>
            <div className="image-content">
              <Carousel images={dashboardImages} />
            </div>
          </section>
          <SectionSeparator />
          <WhyChooseUs />
          <SectionSeparator />
          <LiveSignals />
          <SectionSeparator />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;

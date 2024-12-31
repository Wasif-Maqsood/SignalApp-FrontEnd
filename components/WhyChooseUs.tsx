import React, { useState, useEffect } from 'react';
import './css/WhyChooseUs.css';

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: 'ACCURATE SIGNALS',
      description: 'Expert analysis for the best trading decisions.'
    },
    {
      title: 'REAL-TIME UPDATES',
      description: 'Stay informed with live market data.'
    },
    {
      title: 'COMPREHENSIVE NEWS',
      description: 'Breaking news from top crypto sources.'
    },
    {
      title: 'FRIENDLY INTERFACE',
      description: 'Simple, intuitive, and easy to navigate.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const ChartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l4-4 4 4 4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15l4-4 4 4 4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className="why-choose-us">
      <h2>WHY CHOOSE US?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card ${index === activeIndex ? 'active' : ''}`}
          >
            <div className="feature-icon">
              <ChartIcon />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

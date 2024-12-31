import React from 'react';
import './css/WhyChooseUs.css'

const WhyChooseUs: React.FC = () => {
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

  return (
    <section className="why-choose-us">
      <h2>WHY CHOOSE US?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
              </svg>
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

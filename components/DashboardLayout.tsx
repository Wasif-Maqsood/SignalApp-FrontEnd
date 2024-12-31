import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/DashboardLayout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <nav className="top-navbar">
        <div className="nav-brand">
          <img src="/logo.svg" alt="Signal Bot" />
          <span>Signal Bot</span>
        </div>
        
        <div className="nav-links">
          <Link to="/home" className="nav-link active">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/demo" className="nav-link">Demo</Link>
          <Link to="/testimonials" className="nav-link">Testimonials</Link>
          <Link to="/news" className="nav-link">News</Link>
        </div>

        <div className="nav-actions">
          <button className="nav-button">Login</button>
          <button className="nav-button primary">Getting Started</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>

          <div className="sidebar-menu">
            <Link to="/dashboard" className="menu-item active">
              <svg viewBox="0 0 24 24" className="menu-icon">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link to="/portfolio" className="menu-item">
              <svg viewBox="0 0 24 24" className="menu-icon">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <span>Portfolio</span>
            </Link>
            <Link to="/trades" className="menu-item">
              <svg viewBox="0 0 24 24" className="menu-icon">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
              </svg>
              <span>Trades</span>
            </Link>
            <Link to="/signals" className="menu-item">
              <svg viewBox="0 0 24 24" className="menu-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>Signals</span>
            </Link>
          </div>
        </aside>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from 'react';
import axios from 'axios';
import './css/Login.css';

import NetworkAnimation from '../components/NetworkAnimation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/token-refresh/', {
        refresh: refreshToken,
      });

      if (response.data?.access) {
        localStorage.setItem('access_token', response.data.access);
        console.log('Token refreshed successfully');
      } else {
        console.error('Refresh token expired. Redirecting to login');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      window.location.href = '/login';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      if (response.data?.message === 'OTP sent to email') {
        setOtpSent(true);
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/verify-otp/', {
        email,
        otp,
      });

      if (response.data?.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        window.location.href = '/home';
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="background-wrapper">
        <NetworkAnimation />
      </div>
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                />
                <label>Email Address</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-2 3l-6 5-6-5"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                />
                <label>Password</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder=" "
                  maxLength={6}
                />
                <label>Enter OTP</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default Login;

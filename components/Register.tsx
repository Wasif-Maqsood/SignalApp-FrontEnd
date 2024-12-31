import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';
import NetworkAnimation from './NetworkAnimation';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/register/', { 
        email, 
        password 
      });
      if (response.data.success) {
        setOtpSent(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/verify-otp', { 
        email, 
        otp 
      });
      if (response.data.success) {
        window.location.href = '/login';
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/api/google-login/');
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="register-container">
      <NetworkAnimation />
      <div className="register-box">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join the future of crypto trading</p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleRegister} className="register-form">
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
                  minLength={8}
                />
                <label>Password</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  minLength={8}
                />
                <label>Confirm Password</label>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : 'Create Account'}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button 
              type="button" 
              className="google-button"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.722-1.504,3.178-2.946,4.158 C13.275,19.727,11.067,20.347,8.96,19.515c-2.107-0.832-3.689-2.415-4.521-4.521c-0.832-2.107-0.212-4.315,1.297-6.084 c1.509-1.768,3.736-2.615,5.997-2.272c2.261,0.343,4.172,1.885,5.139,4.145l0.212,0.475l5.694-2.577l-0.212-0.475 c-1.541-3.412-4.399-5.752-7.963-6.413c-3.564-0.661-7.156,0.422-9.957,3.222C1.686,8.963,0.775,13.703,2.225,18.055 c1.45,4.352,5.099,7.412,9.58,8.011c4.481,0.599,8.846-1.464,11.453-5.411c1.659-2.497,2.544-5.463,2.544-8.503v-1.909h-11.35 C13.4,10.242,12.545,11.097,12.545,12.151z"/>
              </svg>
              Continue with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="register-form">
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

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : 'Verify OTP'}
            </button>
          </form>
        )}

        <div className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

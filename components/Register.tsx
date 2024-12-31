import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';
import NetworkAnimation from './NetworkAnimation';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/register/', {
        email: formData.email,
        password: formData.password
      });

      if (response.data?.message === 'OTP sent to email') {
        setOtpSent(true);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://127.0.0.1:8000/api/verify-otp/', {
        email: formData.email,
        password: formData.password,
        otp: parseInt(otp) // Convert OTP to integer as expected by backend
      });

      // Check if we received the tokens
      if (response.data?.access && response.data?.refresh) {
        // Store tokens
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Show success message
        alert('Registration successful!');
        
        // Redirect to home page
        navigate('/home');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('Invalid OTP. Please try again.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://127.0.0.1:8000/api/register/', {
        email: formData.email,
        password: formData.password,
        resend: true
      });

      if (response.data?.message === 'OTP sent to email') {
        alert('New OTP has been sent to your email');
        setOtp(''); // Clear previous OTP
      } else {
        setError('Failed to resend OTP');
      }
    } catch (error: any) {
      setError('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/api/google-login/');
      window.location.href = response.data.authorization_url;
    } catch (error) {
      setError('Failed to initialize Google login');
    }
  };

  return (
    <div className="register-container">
      <NetworkAnimation />
      <div className="register-box">
        <div className="register-header">
          <h1>{otpSent ? 'Verify OTP' : 'Create Account'}</h1>
          <p>
            {otpSent 
              ? 'Enter the OTP sent to your email' 
              : 'Join the future of crypto trading'}
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
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
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    if (error) setError('');
                  }}
                  placeholder=" "
                  maxLength={6}
                  pattern="\d{6}"
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

            <button 
              type="button" 
              className="resend-button"
              onClick={handleResendOtp}
              disabled={isLoading}
            >
              Resend OTP
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

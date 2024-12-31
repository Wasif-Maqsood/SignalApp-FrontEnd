import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Function to refresh token
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
                window.location.href = '/login'; // Redirect to login if refresh token is expired
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            window.location.href = '/login'; // Redirect to login in case of error
        }
    };

    // Function to handle login
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://127.0.0.1:8000/api/login/', {
                email,
                password,
            });

            if (response.data?.message === 'OTP sent to email') {
                setOtpSent(true);
                alert(response.data.message); // Inform the user
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred during login.');
        }
    };

    // Function to handle OTP verification
    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('https://127.0.0.1:8000/api/verify-otp/', {
                email,
                otp,
            });

            // Log the response data for debugging
            console.log('OTP Verification Response Data:', response.data);

            // Check response for access token
            if (response.data?.access) {
                localStorage.setItem('access_token', response.data.access); // Save access token
                localStorage.setItem('refresh_token', response.data.refresh); // Save refresh token

                alert('Login successful!');
                window.location.href = '/home'; // Navigate to the home screen
            } else {
                alert('OTP verification failed. Please try again.');
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            alert('An error occurred during OTP verification.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h1>Login</h1>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px', width: '250px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '8px', width: '250px' }}
                />
            </div>
            {otpSent ? (
                <div style={{ marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ marginRight: '10px', padding: '8px', width: '150px' }}
                    />
                    <button onClick={handleVerifyOtp} style={{ padding: '8px 20px' }}>
                        Verify OTP
                    </button>
                </div>
            ) : (
                <button onClick={handleLogin} style={{ padding: '8px 20px', marginTop: '10px' }}>
                    Login
                </button>
            )}
        </div>
    );
};

export default Login;

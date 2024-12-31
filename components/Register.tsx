import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', { email, password });
            if (response.data.success) {
                setOtpSent(true);
                alert('OTP sent to your email.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-otp', { email, otp });
            if (response.data.success) {
                alert('Registration successful!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {otpSent ? (
                <>
                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </>
            ) : (
                <button onClick={handleRegister}>Register</button>
            )}
        </div>
    );
};

export default Register;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        window.location.href = 'https://127.0.0.1:8000/api/google-login';
    };

    return (
        <div>
            <h1>Login with Google</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default GoogleLogin;

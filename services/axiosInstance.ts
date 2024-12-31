// axiosInstance.ts

import axios from 'axios';

// Helper: Decode JWT to get expiry
const getTokenExpiry = (token: string): number | null => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.exp ? payload.exp * 1000 : null; // Convert to milliseconds
    } catch {
        return null;
    }
};

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://127.0.0.1:8000/api/', // Base URL of your API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add Access Token to Headers
axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
        const accessTokenExpiry = getTokenExpiry(accessToken);

        // If the token is about to expire (within 1 minute), refresh it
        if (accessTokenExpiry && Date.now() > accessTokenExpiry - 60000) {
            try {
                const response = await axios.post('https://127.0.0.1:8000/api/token-refresh/', {
                    refresh: refreshToken,
                });
                if (response.data?.access) {
                    localStorage.setItem('access_token', response.data.access);
                    console.log('Token refreshed successfully.');
                } else {
                    console.error('Refresh token expired. Redirecting to login.');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                window.location.href = '/login';
            }
        }

        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }

    return config;
});

// Response Interceptor: Handle Unauthorized Errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized. Redirecting to login.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

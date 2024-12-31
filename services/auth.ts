import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users/';

export const register = async (email: string, password: string) => {
    return axios.post(`${API_URL}register/`, { email, password });
};

export const verifyOtp = async (email: string, otp: string, password?: string) => {
    return axios.post(`${API_URL}verify-otp/`, { email, otp, password });
};

export const loginRequestOtp = async (email: string) => {
    return axios.post(`${API_URL}login/`, { email });
};

export const verifyLoginOtp = async (email: string, otp: string) => {
    return axios.post(`${API_URL}verify-login-otp/`, { email, otp });
};

export const refreshToken = async (refresh: string) => {
    return axios.post(`${API_URL}token/refresh/`, { refresh });
};

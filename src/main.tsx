import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from '../components/Register';
import Login from '../components/Login';
import GoogleLogin from '../components/GoogleLogin';
import Home from '../components/Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/google-login" element={<GoogleLogin />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);

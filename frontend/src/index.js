import './index.css'; // Global styles
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './AppRouter';
import axios from 'axios';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

// Determine which OAuth provider to use
const useGoogleProvider = true; // Example flag, can be set based on configuration or environment

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/auth/status', { withCredentials: true })
            .then(response => {
                setIsLoggedIn(response.data.isLoggedIn);
                setUsername(response.data.username);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);

    return (
        <Router>
            {
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <AppRouter isLoggedIn={isLoggedIn} username={username}  />
                </GoogleOAuthProvider>
            }
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
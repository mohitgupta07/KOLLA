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
        // Check if the user is logged by checking the cookie set by the backend in the browser
        

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
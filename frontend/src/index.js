import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './AppRouter';

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Example function to read cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const checkLoginStatus = () => {
            const token = getCookie('authToken'); // Adjust cookie name accordingly
            if (token) {
                // Decode token or use it to determine if the user is logged in
                // Set username based on decoded token if needed
                setIsLoggedIn(true);
                setUsername('exampleUsername'); // Replace with actual logic to get username
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <Router>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <AppRouter isLoggedIn={isLoggedIn} username={username} />
            </GoogleOAuthProvider>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

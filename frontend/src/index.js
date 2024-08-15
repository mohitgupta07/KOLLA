import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import SignInPage from './SignInPage';
import SettingsPage from './SettingsPage';
import './index.css'; // Global styles

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

// Components for consistent UI elements across pages
const Footer = () => (
    <Box sx={{ p: 2, mt: 4, backgroundColor: '#1976d2', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">
            © {new Date().getFullYear()} {appName}. All rights reserved.
        </Typography>
    </Box>
);

const Navbar = ({ isLoggedIn, username }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {appName}
            </Typography>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
            {isLoggedIn ? (
                <>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Hello, {username}
                    </Typography>
                    <Button component={Link} to="/settings" color="inherit">Settings</Button>
                </>
            ) : (
                <Button component={Link} to="/signin" color="inherit">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
);

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
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Router>
                <Navbar isLoggedIn={isLoggedIn} username={username} />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    {isLoggedIn && <Route path="/settings" element={<SettingsPage />} />}
                </Routes>
                <Footer />
            </Router>
        </GoogleOAuthProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

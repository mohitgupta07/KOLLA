import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProviderSelection from './ProviderSelection';
import SignInPage from './SignInPage';
import AppRouter from './AppRouter';
import OAuthProviderWrapper from './OAuthProviderWrapper';
import axios from 'axios';

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [provider, setProvider] = useState("google"); // Track selected provider

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

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedProvider = queryParams.get('provider');

    useEffect(() => {
        if (selectedProvider) {
            setProvider(selectedProvider);
        }
    }, [selectedProvider]);

    return (
        <OAuthProviderWrapper provider={provider}>
            <Routes>
                <Route path="/" element={<AppRouter isLoggedIn={isLoggedIn} username={username} />} />
                <Route path="/select-provider" element={<ProviderSelection />} />
                <Route path="/signin" element={<SignInPage />} />
            </Routes>
        </OAuthProviderWrapper>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Root />
    </Router>
);

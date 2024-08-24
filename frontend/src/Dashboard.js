import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = getCookie('auth_token');
            if (token) {
                try {
                    // Decode token to get expiration and other claims
                    const decodedToken = jwtDecode(token);
                    const isExpired = decodedToken.exp * 1000 < Date.now();

                    if (!isExpired) {
                        // Optionally validate the token with the backend
                        const response = await fetch('/api/check-auth', {
                            method: 'GET',
                            credentials: 'include', // Include cookies in the request
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setIsAuthenticated(true);
                            setUserInfo(data); // Set user info from backend
                        } else {
                            setIsAuthenticated(false);
                            setUserInfo(null);
                        }
                    } else {
                        setIsAuthenticated(false);
                        setUserInfo(null);
                    }
                } catch (error) {
                    console.error('Token validation error:', error);
                    setIsAuthenticated(false);
                    setUserInfo(null);
                }
            } else {
                setIsAuthenticated(false);
                setUserInfo(null);
            }
        };

        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });
            setIsAuthenticated(false);
            setUserInfo(null);
            navigate('/'); // Redirect to login or home page
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {isAuthenticated ? (
                <div>
                    <h2>Welcome, {userInfo ? userInfo.name : 'User'}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Please log in to access this page.</p>
            )}
        </div>
    );
};

export default Dashboard;

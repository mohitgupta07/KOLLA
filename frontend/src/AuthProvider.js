import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const logout = useCallback(() => {
        return axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                setUsername('');
            })
            .catch(err => console.error('Logout failed', err));
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', { credentials: 'include' });
                if (response.ok) {
                    const user = await response.json();
                    setIsLoggedIn(true);
                    setUsername(user.name); // Replace 'name' with the actual property in the user object that holds the username
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Failed to check login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
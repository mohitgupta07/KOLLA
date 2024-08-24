import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const [isLoggingOut, setIsLoggingOut] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(() => {
            setIsLoggingOut(false);
            navigate('/signin');
        });
    }, [logout, navigate]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {isLoggingOut && <CircularProgress />}
        </Box>
    );
}

export default Logout;
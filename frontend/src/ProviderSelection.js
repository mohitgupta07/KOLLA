import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProviderSelection = () => {
    const navigate = useNavigate();

    const handleProviderSelect = (provider) => {
        navigate(`/signin?provider=${provider}`);
    };

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Choose Your Sign-In Method
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleProviderSelect('google')}>
                Sign in with Google
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleProviderSelect('facebook')}>
                Sign in with Meta (Facebook)
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleProviderSelect('twitter')}>
                Sign in with Twitter
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleProviderSelect('github')}>
                Sign in with GitHub
            </Button>
        </Box>
    );
};

export default ProviderSelection;

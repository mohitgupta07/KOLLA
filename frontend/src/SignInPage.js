import React from 'react';
import { Box, Typography } from '@mui/material';
import GoogleSignInButton from './GoogleSignInButton';

const SignInPage = () => {
    const handleLoginSuccess = (response) => {
        console.log('Logged in successfully:', response);
        // Handle post-login actions like redirecting the user
    };

    const handleLoginFailure = (error) => {
        console.error('Login failed:', error);
        // Handle login failure
    };

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            <GoogleSignInButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
        </Box>
    );
};

export default SignInPage;

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const SignInPage = () => {
    const handleGoogleSuccess = (response) => {
        console.log('Google Sign-In Success:', response);
        // Handle Google Sign-In response
    };

    const handleGoogleFailure = () => {
        console.error('Google Sign-In Failed');
    };

    const handleSocialSignIn = (provider) => {
        console.log(`Sign-In with ${provider}`);
        // Implement sign-in with other providers
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            <Box sx={{ mb: 2 }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </Box>
            <Button variant="outlined" color="primary" onClick={() => handleSocialSignIn('Twitter')} fullWidth sx={{ mb: 2 }}>
                Sign In with Twitter
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleSocialSignIn('GitHub')} fullWidth sx={{ mb: 2 }}>
                Sign In with GitHub
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleSocialSignIn('Meta')} fullWidth sx={{ mb: 2 }}>
                Sign In with Meta
            </Button>
            {/* Add more sign-in options as needed */}
        </Container>
    );
};

export default SignInPage;

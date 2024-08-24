import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
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
    const handleSocialSignIn = (provider) => {
        console.log(`Sign-In with ${provider}`);
        // Implement sign-in with other providers
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GoogleSignInButton  />
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

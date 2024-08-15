import React from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

const HomePage = () => {
    const onSuccess = (credentialResponse) => {
        axios.post("http://localhost:8080/auth/callback", {
            id_token: credentialResponse.credential
        }, { withCredentials: true })
            .then(res => {
                console.log("Login successful", res);
            })
            .catch(err => {
                console.error("Login failed", err);
            });
    };

    const onFailure = () => {
        console.error("Login failed");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to {appName}
            </Typography>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                style={{ margin: '20px 0' }}
            />
            <Typography variant="body1">
                Sign in with Google to access more features.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://via.placeholder.com/600x300"
                        alt="Sample Image"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This is a sample image card.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default HomePage;

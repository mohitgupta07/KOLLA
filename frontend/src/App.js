import React, { useState } from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import { Container, Typography, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLoginSuccess = (response) => {
        setIsLoggedIn(true);
        // Fetch user info or set username from response
        setUsername('User'); // Replace with actual username from response
    };

    const handleLoginFailure = () => {
        setIsLoggedIn(false);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                setUsername('');
            })
            .catch(err => console.error('Logout failed', err));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to {appName}!
            </Typography>
            {!isLoggedIn ? (
                <Box>
                <GoogleSignInButton
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    style={{ margin: '20px 0' }}
                />
                <Typography variant="body1">
                Sign in with Google to access more features.
                </Typography>
            </Box>
            ) : (
                <Box>
                    <Typography variant="h5">Hello, {username}</Typography>
                    <Button onClick={handleLogout} variant="contained" color="primary">
                        Logout
                    </Button>
                </Box>
            )}

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

export default App;

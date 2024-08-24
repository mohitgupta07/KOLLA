import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import GoogleSignInButton from './GoogleSignInButton';
import { Container, Typography, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

const App = () => {
    const { isLoggedIn, username } = useContext(AuthContext);



    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to {appName}!
            </Typography>
            {!isLoggedIn ? (
                <Box>
                <GoogleSignInButton
                    style={{ margin: '20px 0' }}
                />
                <Typography variant="body1">
                Sign in with Google to access more features.
                </Typography>
            </Box>
            ) : 
            null}

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

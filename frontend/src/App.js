import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';

function App() {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
        <GoogleOAuthProvider clientId={clientId}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MyApp
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to MyApp
                </Typography>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onFailure}
                    style={{ margin: '20px 0' }}
                />
                <Typography variant="body1">
                    Sign in with Google to access more features.
                </Typography>
            </Container>
        </GoogleOAuthProvider>
    );
}

export default App;

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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
            <div className="App">
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;

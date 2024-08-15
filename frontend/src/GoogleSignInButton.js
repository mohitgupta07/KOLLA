import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleSignInButton = ({ onSuccess, onFailure }) => {
    const handleSuccess = (credentialResponse) => {
        axios.post("http://localhost:8080/auth/callback", {
            id_token: credentialResponse.credential
        }, { withCredentials: true })
            .then(res => onSuccess(res))
            .catch(err => onFailure(err));
    };

    const handleFailure = () => {
        console.error("Login failed");
        onFailure();
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
        />
    );
};

export default GoogleSignInButton;

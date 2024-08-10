import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function App() {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const onSuccess = (response) => {
        const { code } = response;
        axios.post("http://localhost:8080/auth/callback", { code }, { withCredentials: true })
            .then(res => {
                console.log("Login successful");
            })
            .catch(err => {
                console.error("Login failed", err);
            });
    };

    const onFailure = (response) => {
        console.error("Login failed", response);
    };

    return (
        <div className="App">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                responseType="code"
            />
        </div>
    );
}

export default App;

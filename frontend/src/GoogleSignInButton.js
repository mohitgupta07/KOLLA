import React from 'react';
import { GOOGLE_CLIENT_ID, REDIRECT_URI, API_URL } from './ConfigInfo';

function GoogleSignInFrontEnd() {
  const handleGoogleSignIn = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20email%20profile`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}

function GoogleSignIn() {
  const handleGoogleSignIn = () => {
    
    window.location.href = API_URL + '/auth/google/login';
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;

import React from 'react';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

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
    window.location.href = 'http://localhost:8080/auth/google/login';
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;

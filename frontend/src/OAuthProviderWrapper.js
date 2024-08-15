import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import other OAuth providers if needed

const OAuthProviderWrapper = ({ provider, children }) => {
    if (provider === 'google') {
        return <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
    }
    // Add other providers' wrappers here if needed
    // e.g., if (provider === 'facebook') { ... }

    return <>{children}</>; // No wrapper if no provider matches
};

export default OAuthProviderWrapper;
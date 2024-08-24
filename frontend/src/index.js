import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthProvider } from './AuthProvider';

const Root = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </Router>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import AboutPage from './AboutPage'; // Ensure you have this component
import './index.css'; // Global styles

// Components for consistent UI elements across pages
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const appName = process.env.REACT_APP_APP_NAME || "MyApp";

const Footer = () => (
    <Box sx={{ p: 2, mt: 4, backgroundColor: '#1976d2', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">
            © {new Date().getFullYear()} {appName}. All rights reserved.
        </Typography>
    </Box>
);

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {appName}
            </Typography>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
        </Toolbar>
    </AppBar>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Add more routes here */}
            </Routes>
            <Footer />
        </Router>
    </GoogleOAuthProvider>
);

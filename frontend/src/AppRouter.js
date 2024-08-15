import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import SignInPage from './SignInPage';
import SettingsPage from './SettingsPage';
import Footer from './Footer';
import Navbar from './Navbar';

const AppRouter = ({ isLoggedIn, username}) => (
    <>
        <Navbar isLoggedIn={isLoggedIn} username={username} />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignInPage />} />
            {isLoggedIn && <Route path="/settings" element={<SettingsPage />} />}
        </Routes>
        <Footer />
    </>
);

export default AppRouter;
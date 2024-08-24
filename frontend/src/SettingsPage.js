import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import Logout from './Logout';

const SettingsPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch user data when component mounts
        axios.get('http://localhost:8080/user/profile')
            .then(response => setUserData(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/user/update', userData)
            .then(response => {
                setSuccessMessage('Profile updated successfully!');
            })
            .catch(error => {
                setErrorMessage('Error updating profile.');
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Update Profile
                    </Button>
                </Box>
            </form>
            {successMessage && <Typography color="green" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography color="red" sx={{ mt: 2 }}>{errorMessage}</Typography>}
            <Box sx={{ mt: 2 }}>  <Logout />  </Box>
        </Container>
    );
};

export default SettingsPage;

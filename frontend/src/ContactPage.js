import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/contact', formData)
            .then(response => {
                setSuccessMessage('Your message has been sent!');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch(error => {
                setErrorMessage('There was an error sending your message.');
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Send Message
                    </Button>
                </Box>
            </form>
            {successMessage && <Typography color="green" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography color="red" sx={{ mt: 2 }}>{errorMessage}</Typography>}
        </Container>
    );
};

export default ContactPage;

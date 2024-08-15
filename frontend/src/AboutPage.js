import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const AboutPage = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                About Us
            </Typography>
            <Typography variant="h6" paragraph>
                Welcome to {process.env.REACT_APP_APP_NAME}! We are a company dedicated to providing the best services and solutions to our customers.
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="body1">
                            Our mission is to deliver innovative and high-quality products that meet the needs of our diverse clientele. We strive to exceed expectations and build lasting relationships based on trust and excellence.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1">
                            If you have any questions or need further information, please feel free to contact us at:
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Email: support@example.com
                        </Typography>
                        <Typography variant="body1">
                            Phone: +1-800-123-4567
                        </Typography>
                        <Typography variant="body1">
                            Address: 123 Main Street, City, Country
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1">
                    Thank you for visiting our site! We are excited to connect with you.
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutPage;

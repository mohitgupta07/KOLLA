import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
    <Box sx={{ p: 2, mt: 4, backgroundColor: '#1976d2', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">
            © {new Date().getFullYear()} {process.env.REACT_APP_APP_NAME || "MyApp"}. All rights reserved.
        </Typography>
    </Box>
);

export default Footer;

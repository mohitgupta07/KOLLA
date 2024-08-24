import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {process.env.REACT_APP_APP_NAME || "MyApp"}
            </Typography>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
            <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
            {isLoggedIn ? (
                <>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Hello, {username}
                    </Typography>
                    <Button component={Link} to="/settings" color="inherit">Settings</Button>
                </>
            ) : (
                <Button component={Link} to="/signin" color="inherit">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
);

export default Navbar;
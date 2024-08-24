import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Hidden, IconButton, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ isLoggedIn, username }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItem button component={Link} to="/">Home</ListItem>
                <ListItem button component={Link} to="/about">About</ListItem>
                <ListItem button component={Link} to="/contact">Contact</ListItem>
                {isLoggedIn ? (
                    <>
                        <ListItem button component={Link} to="/dashboard">Dashboard</ListItem>
                        <ListItem button component={Link} to="/settings">Settings</ListItem>
                    </>
                ) : (
                    <ListItem button component={Link} to="/signin">Sign In</ListItem>
                )}
            </List>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {process.env.REACT_APP_APP_NAME || "MyApp"}
                    {isLoggedIn && ` - Kolla, ${username}!`}
                </Typography>
                <Hidden xsDown implementation="css">
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/about" color="inherit">About</Button>
                    <Button component={Link} to="/contact" color="inherit">Contact</Button>
                    {isLoggedIn ? (
                        <>
                            <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                            <Button component={Link} to="/settings" color="inherit">Settings</Button>
                        </>
                    ) : (
                        <Button component={Link} to="/signin" color="inherit">Sign In</Button>
                    )}
                </Hidden>
            </Toolbar>
            <nav>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </AppBar>
    );
};

export default Navbar;
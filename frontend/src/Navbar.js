import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Navbar = ({ isLoggedIn, username }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} to="/contact">
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItem>
                {isLoggedIn ? (
                    <>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/settings">
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button component={Link} to="/logout">
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                ) : (
                    <ListItem button component={Link} to="/signin">
                        <ListItemIcon><LockOpenIcon /></ListItemIcon>
                        <ListItemText primary="Sign In" />
                    </ListItem>
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
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {process.env.REACT_APP_APP_NAME || "MyApp"}
                    {isLoggedIn && ` - Kolla, ${username}!`}
                </Typography>
                <Hidden smDown>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/about" color="inherit">About</Button>
                    <Button component={Link} to="/contact" color="inherit">Contact</Button>
                    {isLoggedIn ? (
                        <>
                            <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                            <Button component={Link} to="/settings" color="inherit">Settings</Button>
                            <Button component={Link} to="/logout" color="inherit">Logout</Button>
                        </>
                    ) : (
                        <Button component={Link} to="/signin" color="inherit">Sign In</Button>
                    )}
                </Hidden>
            </Toolbar>
            <nav>
                <Hidden mdUp>
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
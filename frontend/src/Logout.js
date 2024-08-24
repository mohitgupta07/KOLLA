import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from './AuthProvider';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    return (
        <Button onClick={logout} variant="contained" color="primary">
            Logout
        </Button>
    );
}

export default Logout;
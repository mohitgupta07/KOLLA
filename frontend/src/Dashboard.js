import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const Dashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);

    // Sample data for cards
    const cards = [
        { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/600x300' },
        { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/600x300' },
        { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/600x300' },
        // Add more cards as needed
    ];

    return (
        <Box sx={{ mt: 4 }}>
            {isLoggedIn ? (
                <Grid container spacing={2}>
                    {cards.map((card) => (
                        <Grid item xs={12} sm={6} md={4} key={card.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.image}
                                    alt={card.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p>Please log in to access this page.</p>
            )}
        </Box>
    );
};

export default Dashboard;
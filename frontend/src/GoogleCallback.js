import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleCallbackFrontend() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authorizationCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          if (data.token) {
            localStorage.setItem('authToken', data.token); // Store token in local storage
            navigate('/dashboard'); // Redirect to your dashboard or another protected route
          } else {
            console.error('Failed to log in');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming the backend has already set a session or JWT
    // Redirect the user to the dashboard or protected route
    navigate('/dashboard');
  }, [navigate]);

  return <div>Loading...</div>;
}

export default GoogleCallback;

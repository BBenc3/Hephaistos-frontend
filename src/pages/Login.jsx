import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import { useTheme } from '@mui/material/styles';
import Notification from '../components/Notification';
import useUserData from '../hooks/useUserData'; // Import the useUserData hook

const Login = () => {
  const { isLoggedIn, login, error } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'warning' });

  const { user, loading, errorNotification } = useUserData(); // Use the hook to get user data and loading state

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    // If the user is already logged in, redirect them to their profile page
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Error handling: if an error occurs, set the notification state
    if (error) {
      setNotification({ open: true, message: error, severity: 'error' });
    }
  }, [error]);

  if (loading) {
    // Show a loading spinner while fetching the user data
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isLoggedIn) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: '90%', sm: '60%', md: '30%' },
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Már be vagy jelentkezve!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ha vissza szeretnél térni a főoldalra, kattints az alábbi gombra.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: blue[500],
              color: '#fff',
              '&:hover': { backgroundColor: blue[700] },
              mt: 2,
            }}
            onClick={() => navigate('/')}
          >
            Vissza a főoldalra
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        width: '100%',
      }}
    >
      <Box sx={{ flexGrow: 1, width: { xs: '90%', sm: '60%', md: '40%' } }}>
        <LoginForm handleLogin={login} setNotification={setNotification} />
      </Box>
      {errorNotification}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
    </Box>
  );
};

export default Login;

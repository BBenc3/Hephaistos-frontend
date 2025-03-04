import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/Login/LoginForm';
import { useTheme } from '@mui/material/styles';
import Notification from '../../components/Notification';

const Login = () => {
  const { isLoggedIn, login, error } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'warning' });

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) {
      setNotification({ open: true, message: error, severity: 'error' });
    }
  }, [error]);

  if (isLoggedIn) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            Már be vagy jelentkezve, ha vissza szeretnél térni a főoldalra, kattints az alábbi gombra.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: blue[500], color: '#fff', '&:hover': { backgroundColor: blue[700] } }}
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
      }}
    >
      <LoginForm handleLogin={login} setNotification={setNotification} />
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
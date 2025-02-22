import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/auth/forms/LoginForm';
import { useTheme } from '@mui/material/styles';
import Notification from '../../components/Notification/Notification';

const Login = () => {
  const { isLoggedIn, login, error } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
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
    document.body.classList.add('custom-scrollbar');
    document.body.style.overflowY = 'hidden'; // Disable vertical scrolling
    return () => {
      document.body.classList.remove('custom-scrollbar');
      document.body.style.overflowY = 'auto'; // Re-enable vertical scrolling
    };
  }, []);

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
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <LoginForm handleLogin={login} setNotification={setNotification} />
      <Button
        variant="contained"
        sx={{ backgroundColor: blue[500], color: '#fff', '&:hover': { backgroundColor: blue[700] } }}
        onClick={() => navigate('/forgotpassword')}
      >
        Elfelejtettem a jelszavamat
      </Button>
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
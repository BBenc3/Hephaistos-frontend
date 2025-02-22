import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Register/RegisterForm';
import Notification from '../../components/Notification';
import { useTheme } from '@mui/material/styles';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'warning' });

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
        },
      }}
    >
      <RegisterForm setNotification={setNotification} />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          padding: 2,
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
          marginTop: 3,
          width: '100%', // Full width for mobile view
        }}
      >
        <Typography variant="body2">
          Már van fiókod?{' '}
          <Typography
            component="span"
            sx={{ color: 'primary.main', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Jelentkezz be!
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;

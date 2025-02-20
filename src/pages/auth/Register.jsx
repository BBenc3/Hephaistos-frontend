import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/forms/RegisterForm';
import Notification from '../../components/Notification/Notification';

const Register = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'warning' });

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden'; // Disable vertical scrolling
    return () => {
      document.body.style.overflowY = 'auto'; // Re-enable vertical scrolling
    };
  }, []);

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
        }}
       
      >
        <Typography variant="body2">
          Már van fiókod?{' '}
          <Typography
            component="span"
            sx={{ color: 'primary.main', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Jelentkezz be!
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;

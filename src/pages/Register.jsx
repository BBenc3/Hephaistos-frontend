import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Notification from '../components/Notification';
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
        justifyContent: 'space-between',
        mt: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, width: '100%', [theme.breakpoints.up('md')]: { width: '50%' } }}>
        <RegisterForm setNotification={setNotification} />
      </Box>
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
    </Box>
  );
};

export default Register;

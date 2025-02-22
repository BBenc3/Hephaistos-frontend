import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../../components/Register/RegisterForm';
import Notification from '../../../components/Notification';
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
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '60%',
          [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
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
      </Box>
    </Box>
  );
};

export default Register;

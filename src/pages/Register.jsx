import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

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
      <RegisterForm />
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          padding: 2,
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
          marginTop: 3,
        }}
        onClick={() => navigate('/login')}
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

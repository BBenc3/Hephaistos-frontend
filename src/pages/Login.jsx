import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { isLoggedIn, handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5%',
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
        backgroundColor: '#F5F5DC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      }}
    >
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
};

export default Login;

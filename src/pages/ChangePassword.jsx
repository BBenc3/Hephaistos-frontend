import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordForm from '../components/ChangePasswordForm';

const ChangePassword = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
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
            Nincs bejelentkezve!
          </Typography>
          <Typography variant="body1" gutterBottom>
            A jelszó módosításához be kell jelentkezned.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: blue[500], color: '#fff', '&:hover': { backgroundColor: blue[700] } }}
            onClick={() => navigate('/login')}
          >
            Bejelentkezés
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
        paddingTop: '5%',
      }}
    >
      <ChangePasswordForm />
      <Typography
        variant="body2"
        sx={{ marginTop: 2, color: blue[500], cursor: 'pointer' }}
        onClick={() => navigate('/forgot-password')}
      >
        Elfelejtettem a jelszavam
      </Typography>
    </Box>
  );
};

export default ChangePassword;
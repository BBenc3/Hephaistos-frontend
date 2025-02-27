import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import LoginFormFields from './LoginFormFields';
import ForgotPasswordButton from '../ForgotPasswordButton';

const LoginForm = ({ setNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Define password state
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setNotification({ open: true, message: 'Minden mezőt ki kell tölteni!', severity: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await login({ email, password, stayLoggedIn }); // Pass credentials to login function
      navigate('/profile');
    } catch (error) {
      let errorMsg = 'Hibás email vagy jelszó!';

      if (error?.response?.data) {
        errorMsg = error.response.data;
      }

      setNotification({ open: true, message: errorMsg, severity: 'error' });
      setFailedAttempts(failedAttempts + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: '40%', // Updated width
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flexGrow: 1, padding: '3%' }}>
        <img src='/logo.png' alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
        <Typography variant="h4" gutterBottom>
          Bejelentkezés
        </Typography>
        <LoginFormFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          navigate={navigate}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.secondary,
            },
          }}
        />
        <Box>
          <label>
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
            />
            Maradjak bejelentkezve
          </label>
        </Box>
        <ForgotPasswordButton navigate={navigate} failedAttempts={failedAttempts} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
            width: '40%',
            marginTop: '1%'
          }}
          onClick={handleLoginSubmit}
          disabled={loading}
        >
          {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: 2,
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
            marginTop: 2,
          }}
        >
          <Typography variant="body2">
            Nincs fiókod?{' '}
            <Typography
              component="span"
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => navigate ('/register')}
            >
              Regisztrálj
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;

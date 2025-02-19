import React, { useState } from 'react';
import { TextField, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Button from '../components/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }
    setLoading(true);
    try {
      await login({ email, password }); // Pass credentials to login function
      navigate('/profile');
    } catch (error) {
      setErrorMessage('Hibás email vagy jelszó!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        width: { xs: '90%', sm: '60%', md: '40%' },
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
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Jelszó"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white, '&:hover': { backgroundColor: theme.palette.primary.dark }, width: '90%', marginTop: '5%' }}
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
              onClick={() => navigate('/register')}
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

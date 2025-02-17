import React, { useState } from 'react';
import { TextField, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Button from '../components/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:5001/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/;`;
      handleLogin();
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5DC',
        padding: '5%',
        minHeight: '100vh',
        boxShadow: '0px -10px 20px rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
      }}
    >
      <img src="../public/logo.jpg" alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
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
        sx={{ backgroundColor: '#008080', color: '#fff', '&:hover': { backgroundColor: '#006666' }, marginTop: 2 }}
        onClick={handleLoginSubmit}
        disabled={loading}
      >
        {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
      </Button>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: 2,
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: 2,
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="body2">
          Nincs fiókod?{' '}
          <Typography
            component="span"
            sx={{ color: '#008080', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Regisztrálj
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;

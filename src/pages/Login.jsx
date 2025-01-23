// Login.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { blue } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://localhost:5001/auth/login', {
        email,
        password,
      });

      // Refresh és Access tokenek cookie-kba tárolása
      document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/;`;

      navigate('/');
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
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0.5 }}>
        <Button
          variant="text"
          sx={{ fontSize: '0.7rem' }}
          onClick={() => navigate('/register')}
        >
          Még nincs felhasználód?
        </Button>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: blue[500], color: '#fff', '&:hover': { backgroundColor: blue[700] } }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

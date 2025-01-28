import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password,
      });

      // JWT token fogadása
      const token = response.data.token;

      // Token elmentése a localStorage-ba
      localStorage.setItem('token', token);

      // Navigálj a főoldalra
      navigate('/');
    } catch (error) {
      console.error('Hiba a bejelentkezés során:', error);
    }
  };

  return (
    <Box 
      sx={{
        backgroundcolor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bejelentkezés
      </Typography>
      <TextField 
        label="Felhasználónév" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField 
        label="Jelszó" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
        sx={{ marginTop: 2 }}
      >
        Bejelentkezés
      </Button>
    </Box>
  );
};

export default Login;

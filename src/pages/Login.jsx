import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { blue } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook to access the global state

const Login = () => {
  const { isLoggedIn, handleLogin } = useAuth(); // Get the global state and login handler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If the user is already logged in, show a message and allow them to go back to the homepage
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to the homepage if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:5001/login', {
        email,
        password,
      });
  
      // Set the access and refresh tokens in localStorage and cookies
      localStorage.setItem('accessToken', response.data.accessToken); // Store access token
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/;`; // Store refresh token in cookies
  
      // Update the global state to reflect the logged-in status
      handleLogin(); // Call the handleLogin function to update the context state
  
      navigate('/profile'); // Redirect to the profile page after successful login
    } catch (error) {
      setErrorMessage('Hibás email vagy jelszó!');
    } finally {
      setLoading(false);
    }
  };
  
  // If the user is logged in, show the "Already Logged In" message with a button to go back to the homepage
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
            onClick={handleLoginSubmit}
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

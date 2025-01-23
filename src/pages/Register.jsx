// Register.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, LinearProgress, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { blue, green, yellow, red } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ level: 'rossz', color: red[500], progress: 33 });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      return { level: 'rossz', color: red[500], progress: 33 };
    } else if (password.length < 10) {
      return { level: 'megfelelő', color: yellow[500], progress: 66 };
    } else {
      return { level: 'jó', color: green[500], progress: 100 };
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordStrength(evaluatePasswordStrength(password));
  };

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('A jelszavak nem egyeznek!');
      return;
    }

    if (passwordStrength.level === 'rossz') {
      setErrorMessage('A jelszó nem elég erős!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://localhost:5001/auth/register', {
        email,
        username,
        password,
      });

      navigate('/auth/login');
    } catch (error) {
      setErrorMessage('Hiba a regisztráció során!');
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
          Regisztráció
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
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
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
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 0 }}>
          <LinearProgress 
            variant="determinate" 
            value={passwordStrength.progress} 
            sx={{ flexGrow: 1, marginRight: 1, height: 10, borderRadius: 5, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: passwordStrength.color } }}
          />
          <Typography>{passwordStrength.level}</Typography>
        </Box>
        <TextField 
          label="Jelszó megerősítése" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          
        />
        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button 
          variant="contained" 
          sx={{ backgroundColor: blue[500], color: '#fff', '&:hover': { backgroundColor: blue[700] }, marginTop: 2 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Regisztráció...' : 'Regisztráció'}
        </Button>
      </Box>
    </Box>
  );
};

export default Register;

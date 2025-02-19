import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNextStep = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('A jelszavak nem egyeznek!');
      return;
    }

    try {
      await axios.post('https://localhost:5001/register', {
        email,
        username,
        password,
      });
      navigate('/Register2');
    } catch (error) {
      setErrorMessage('Hiba a regisztráció során!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 6,
        justifyContent: 'center',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#F6F4E8',
          borderRadius: 3,
          boxShadow: 3,
          width: { xs: '90%', sm: '60%', md: '40%' },
          textAlign: 'center',
        }}
      >
        <Box sx={{ padding: '1%', marginLeft: 6, marginRight: 6 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 120, height: 120, marginBottom: 16 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004D40', marginBottom: 3 }}>Adatok megadása</Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Teljes név" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} sx={{ backgroundColor: 'white' }} />
            <TextField label="E-mail" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ backgroundColor: 'white' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Jelszó"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: 'white' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Jelszó ismét"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ backgroundColor: 'white' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#1D8C8C', '&:hover': { backgroundColor: '#004D40' }, borderRadius: 2 }}
            onClick={handleNextStep}
          >
            Tovább
          </Button>

          <Stepper activeStep={1} sx={{ mt: 3, marginTop: 6 }}>
            <Step><StepLabel>Lépés 1</StepLabel></Step>
            <Step><StepLabel>Lépés 2</StepLabel></Step>
            <Step><StepLabel>Lépés 3</StepLabel></Step>
          </Stepper>
        </Box>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: 2,
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
            marginTop: 3,
          }}
          onClick={() => navigate('/login')}
        >
          <Typography variant="h6" sx={{ color: '#004D40' }}>
            Már van fiókod?{' '}
            <span style={{ color: '#1D8C8C', fontWeight: 'bold' }}>Jelentkezz be!</span>
          </Typography>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box sx={{ width: '100%', textAlign: 'center', padding: 2, backgroundColor: 'transparent', marginTop: 4 }}>
        <Typography variant="body2" fontWeight="bold">Üzemeltető és fejlesztő: Hephaistos Kft.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/contact')}>Kapcsolat</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}>Adatkezelési nyilatkozat</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/technical-info')}>Technikai információk</Typography>
          <Typography variant="body2">© 2025 Hephaistos. Minden jog fenntartva</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/faq')}>GYIK</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

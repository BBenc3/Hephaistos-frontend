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
  const [openDropdown, setOpenDropdown] = useState(false); // Dropdown state
  const navigate = useNavigate();

  const handleRegister = async () => {
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
      navigate('/Login');
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
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#F6F4E8',
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: { xs: '90%', sm: '60%', md: '40%' },
          textAlign: 'center'
        }}
      >
        <img src="public\hephaistos_logo.png" alt="Logo" style={{ width: 120, height: 120, marginBottom: 16 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004D40', marginBottom: 3 }}>Regisztráció</Typography>
        
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
          onClick={handleRegister}
        >
          REGISZTRÁCIÓ
        </Button>

        <Stepper activeStep={1} sx={{ mt: 3 }}>
          <Step>
            <StepLabel>Lépés címe</StepLabel>
          </Step>
          <Step>
            <StepLabel>Lépés címe</StepLabel>
          </Step>
          <Step>
            <StepLabel>Lépés címe</StepLabel>
          </Step>
        </Stepper>
        <Box
        sx={{
          padding: '1%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          mt: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
        onClick={() => setOpenDropdown(!openDropdown)} // Dropdown toggle
      >
        <Typography variant="h6" sx={{ color: '#004D40' }}>
          Már van fiókod?{' '}
          <span style={{ color: '#1D8C8C', fontWeight: 'bold' }}>Jelentkezz be!</span>
        </Typography>
      </Box>
      </Box>

      {/* Fehér díszléc és legördülő effektus */}
      

      {openDropdown && (
        <Box
          sx={{
            width: '1222px',
            height: 'auto',
            backgroundColor: 'white',
            boxShadow: 3,
            mt: 1,
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
          }}
        >
          {/* Ide teheted a legördülő tartalmat */}
          <Typography variant="body1" sx={{ color: '#004D40' }}>
            Itt jöhet egy legördülő tartalom!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Register;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

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
        backgroundColor: theme.palette.background.default,
        borderRadius: 3,
        boxShadow: 3,
        width: { xs: '90%', sm: '60%', md: '40%' },
        textAlign: 'center',
        padding: '1%',
        marginLeft: 6,
        marginRight: 6,
      }}
    >
      <img src="/logo.png" alt="Logo" style={{ width: 120, height: 120, marginBottom: 16 }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, marginBottom: 3 }}>Adatok megadása</Typography>

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
        sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: 2 }}
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
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import RegisterFormFields from './RegisterFormFields';
import RegisterStepper from './RegisterStepper';

const RegisterForm = ({ setNotification }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNextStep = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setNotification({ open: true, message: 'Minden mezőt ki kell tölteni!', severity: 'warning' });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({ open: true, message: 'A jelszavak nem egyeznek!', severity: 'warning' });
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
      setNotification({ open: true, message: 'Hiba a regisztráció során!', severity: 'error' });
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
      <RegisterFormFields
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        errorMessage={errorMessage}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: 2 }}
        onClick={handleNextStep}
      >
        Tovább
      </Button>
      <RegisterStepper activeStep={1} />
    </Box>
  );
};

export default RegisterForm;

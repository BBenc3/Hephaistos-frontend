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
      await axios.post('https://localhost:5001/api/auth/register', {
        email,
        username,
        password,
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        if (errors && Array.isArray(errors)) {
          const passwordErrorMessages = errors.map(err => {
            switch (err.code) {
              case 'PasswordRequiresNonAlphanumeric':
                return 'A jelszónak tartalmaznia kell legalább egy nem alfanumerikus karaktert.';
              case 'PasswordRequiresDigit':
                return 'A jelszónak tartalmaznia kell legalább egy számjegyet (0-9).';
              case 'PasswordRequiresUpper':
                return 'A jelszónak tartalmaznia kell legalább egy nagybetűt (A-Z).';
              default:
                return err.description;
            }
          }).join(' ');
          setNotification({ open: true, message: `A jelszó nem megfelelő: ${passwordErrorMessages}`, severity: 'warning' });
        } else if (message && message.includes('Email already exists')) {
          setNotification({ open: true, message: 'Az email cím már regisztrálva van!', severity: 'warning' });
        } else {
          setNotification({ open: true, message: 'Hiba a regisztráció során!', severity: 'error' });
        }
      } else {
        setNotification({ open: true, message: 'Ismeretlen hiba történt!', severity: 'error' });
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNextStep();
    }
  };

  return (
    <>
    <Box
      sx={
        {
          backgroundColor: theme.palette.background.default,
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
        }
      }
    >

      <Box
        sx={{

          padding: '3%',
          [theme.breakpoints.down('sm')]: {
            width: '90%',
            padding: '5%',
          },
        }}
      >
        <img src="/logo.png" alt="Logo" style={{ width: 120, height: 120, margin: '0 auto 16px' }} />
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
          onKeyPress={handleKeyPress} // Add this line
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: theme.palette.primary.main, marginTop: 5, width: '40%', margin: '3% auto', '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: 2 }}
          onClick={handleNextStep}
        >
          Tovább
        </Button>
        <RegisterStepper activeStep={1}/>
      </Box>
<Box
        sx={{
          backgroundColor: 'secondary.main',
          padding: 2,
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="body2">
          Már van fiókod?{' '}
          <Typography
            component="span"
            sx={{ color: 'primary.main', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Jelentkezz be!
          </Typography>
        </Typography>
      </Box>
      </Box>
    </>
  );
};

export default RegisterForm;

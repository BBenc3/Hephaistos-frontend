import React, { useState } from 'react';
import { Box, Typography, Button, useMediaQuery, Stepper, Step, StepLabel, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import RegisterFormFields from './RegisterFormFields';

const steps = ['Adatok megadása', 'Egyetem adatai', 'Elvégzett tárgyak'];

const universities = ['Egyetem 1', 'Egyetem 2', 'Egyetem 3', 'Egyetem 4'];
const faculties = ['Kar 1', 'Kar 2', 'Kar 3', 'Kar 4'];

const RegisterForm = ({ setNotification }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [studyStatus, setStudyStatus] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => {
    if (activeStep === 0 && (!email || !username || !password || !confirmPassword)) {
      setNotification({ open: true, message: 'Minden mezőt ki kell tölteni!', severity: 'warning' });
      return;
    }
    if (activeStep === 0 && password !== confirmPassword) {
      setNotification({ open: true, message: 'A jelszavak nem egyeznek!', severity: 'warning' });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRegister = async () => {
    const payload = {
      email,
      username,
      password,
      university,
      faculty,
      studyStatus,
      subjectName,
      subjectCode,
      subjectType,
    };
    console.log('Register payload:', payload); // Log the payload to see what is being sent

    try {
      await axios.post('https://localhost:5001/api/auth/register', payload);
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
      if (activeStep === steps.length - 1) {
        handleRegister();
      } else {
        handleNext();
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }} onKeyPress={handleKeyPress}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          width: '100%',
          borderRadius: '12px',
          boxShadow: isMobile ? null : '0px 4px 20px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '3%',
          [theme.breakpoints.down('sm')]: {
            padding: '5%',
          },
        }}
      >
        {activeStep === 0 && (
          <>
            <img src="/logo.png" alt="Logo" style={{ width: '120px', height: '120px', margin: '0 auto 16px' }} />
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
              onKeyPress={handleKeyPress}
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, marginBottom: 3 }}>Egyetem adatai</Typography>
            <TextField
              label="Egyetem neve"
              variant="outlined"
              fullWidth
              margin="normal"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              select
              onKeyPress={handleKeyPress}
            >
              {universities.map((uni) => (
                <MenuItem key={uni} value={uni}>
                  {uni}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Kar"
              variant="outlined"
              fullWidth
              margin="normal"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              select
              onKeyPress={handleKeyPress}
            >
              {faculties.map((fac) => (
                <MenuItem key={fac} value={fac}>
                  {fac}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Tanulmányi státusz"
              variant="outlined"
              fullWidth
              margin="normal"
              value={studyStatus}
              onChange={(e) => setStudyStatus(e.target.value)}
              select
              onKeyPress={handleKeyPress}
            >
              <MenuItem value="Aktív">Aktív</MenuItem>
              <MenuItem value="Passzív">Passzív</MenuItem>
            </TextField>
          </>
        )}
        {activeStep === 2 && (
          <>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, marginBottom: 3 }}>Elvégzett tárgyak</Typography>
            <TextField
              label="Tantárgy neve"
              variant="outlined"
              fullWidth
              margin="normal"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <TextField
              label="Tantárgy kódja"
              variant="outlined"
              fullWidth
              margin="normal"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <TextField
              label="Kötelező vagy választható tárgy"
              variant="outlined"
              fullWidth
              margin="normal"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              select
              onKeyPress={handleKeyPress}
            >
              <MenuItem value="Kötelező">Kötelező</MenuItem>
              <MenuItem value="Választható">Választható</MenuItem>
            </TextField>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Vissza
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleRegister}>
              Regisztráció
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Tovább
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          padding: 2,
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
          marginTop: 2,
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
  );
};

export default RegisterForm;

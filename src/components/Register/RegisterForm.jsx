import React, { useState } from 'react';
import { Box, Typography, Button, useMediaQuery, Stepper, Step, StepLabel, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import RegisterFormFields from './RegisterFormFields';

const steps = ['Adatok megadása', 'Egyetem adatai', 'Elvégzett tárgyak'];

const RegisterForm = ({ setNotification }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');
  const [studyStatus, setStudyStatus] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [completionYearSemester, setCompletionYearSemester] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    try {
      await axios.post('https://localhost:5001/api/auth/register', {
        email,
        username,
        password,
        university,
        faculty,
        enrollmentYear,
        studyStatus,
        subjectName,
        subjectCode,
        subjectType,
        completionYearSemester,
      });
      navigate('/login');
    } catch (error) {
      setNotification({ open: true, message: errorMsg, severity: 'error' });
    }
    finally {
      setLoading(false);
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
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          backgroundColor: isMobile ? 'none' : theme.palette.background.default,
          borderRadius: isMobile ? 'none' : '12px',
          boxShadow: isMobile ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Felső és alsó tartalom elrendezése
          width: isMobile ? '100%' : 'auto',
          p: isMobile ? 0 : 2
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <img src='/logo.png' alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
          <Typography variant="h4" gutterBottom>
            Regisztráció
          </Typography>
          <RegisterFormFields
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            errorMessage={errorMsg}
            onKeyPress={handleKeyPress} // Add this line
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              width: isMobile ? '50%' : '40%',
              height: '50px',
              marginTop: '1%',
            }}
            onClick={handleNextStep}
            disabled={loading}
          >
            {loading ? 'Regisztráció...' : 'Regisztráció'}

          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            position: isMobile ? 'absolute' : 'static',
            bottom: isMobile ? 0 : 'auto',
            left: 0,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.secondary.main,
              padding: 2,
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: isMobile ? 'none' : '0px -3px 10px rgba(0, 0, 0, 0.2)',
              marginTop: 2,
            }}
          >
            <Typography variant="body2">
              Már van fiókod?{' '}
              <Typography
                component="span"
                sx={{ color: theme.palette.primary.main, fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                Jelentkezz be!
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;

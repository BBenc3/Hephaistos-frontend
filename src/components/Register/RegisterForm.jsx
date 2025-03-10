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
            />
            <TextField
              label="Kar"
              variant="outlined"
              fullWidth
              margin="normal"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
            <TextField
              label="Beiratkozás éve"
              variant="outlined"
              fullWidth
              margin="normal"
              value={enrollmentYear}
              onChange={(e) => setEnrollmentYear(e.target.value)}
            />
            <TextField
              label="Tanulmányi státusz"
              variant="outlined"
              fullWidth
              margin="normal"
              value={studyStatus}
              onChange={(e) => setStudyStatus(e.target.value)}
              select
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
            />
            <TextField
              label="Tantárgy kódja"
              variant="outlined"
              fullWidth
              margin="normal"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
            <TextField
              label="Kötelező vagy választható tárgy"
              variant="outlined"
              fullWidth
              margin="normal"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              select
            >
              <MenuItem value="Kötelező">Kötelező</MenuItem>
              <MenuItem value="Választható">Választható</MenuItem>
            </TextField>
            <TextField
              label="Év / Félév, amikor teljesítve lett"
              variant="outlined"
              fullWidth
              margin="normal"
              value={completionYearSemester}
              onChange={(e) => setCompletionYearSemester(e.target.value)}
            />
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

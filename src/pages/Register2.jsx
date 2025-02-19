import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');
  const [studyStatus, setStudyStatus] = useState('Aktív');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!university || !faculty || !enrollmentYear) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }

    try {
      await axios.post('https://localhost:5001/register', {
        university,
        faculty,
        enrollmentYear,
        studyStatus,
      });
      navigate('/Register3');
    } catch (error) {
      setErrorMessage('Hiba a regisztráció során!');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Box sx={{ backgroundColor: '#F6F4E8', borderRadius: 3, boxShadow: 3, width: { xs: '90%', sm: '60%', md: '40%' }, textAlign: 'center' }}>
        <Box sx={{ padding: '1%' }}>
          <img src="/logo.png" alt="Logo" style={{ width: 120, height: 120, marginBottom: 16 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004D40', marginBottom: 3 }}>Regisztráció</Typography>
          
          <TextField label="Egyetem neve" variant="outlined" fullWidth value={university} onChange={(e) => setUniversity(e.target.value)} sx={{ backgroundColor: 'white', mb: 2 }} />
          <TextField label="Kar" variant="outlined" fullWidth value={faculty} onChange={(e) => setFaculty(e.target.value)} sx={{ backgroundColor: 'white', mb: 2 }} />
          <TextField label="Beiratkozás éve" variant="outlined" fullWidth value={enrollmentYear} onChange={(e) => setEnrollmentYear(e.target.value)} sx={{ backgroundColor: 'white', mb: 2 }} />
          <TextField
            select
            label="Tanulmányi státusz"
            variant="outlined"
            fullWidth
            value={studyStatus}
            onChange={(e) => setStudyStatus(e.target.value)}
            sx={{ backgroundColor: 'white', mb: 2 }}
          >
            <MenuItem value="Aktív">Aktív</MenuItem>
            <MenuItem value="Passzív">Passzív</MenuItem>
          </TextField>

          {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
          
          <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#1D8C8C', '&:hover': { backgroundColor: '#004D40' }, borderRadius: 2 }} onClick={handleRegister}>
            Tovább
          </Button>

          <Stepper activeStep={2} sx={{ mt: 3 }}>
            <Step><StepLabel>Lépés 1</StepLabel></Step>
            <Step><StepLabel>Lépés 2</StepLabel></Step>
            <Step><StepLabel>Lépés 3</StepLabel></Step>
          </Stepper>
        </Box>
        <Box sx={{ backgroundColor: '#FFFFFF', padding: 2, borderRadius: '8px', textAlign: 'center', boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)', marginTop: 2 }} onClick={() => navigate('/login')}>
          <Typography variant="h6" sx={{ color: '#004D40' }}>
            Már van fiókod? <span style={{ color: '#1D8C8C', fontWeight: 'bold' }}>Jelentkezz be!</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

import React, { useState } from 'react';
import {
  TextField, Button, Box, Grid, InputAdornment, Select,
  MenuItem, InputLabel, FormControl, IconButton, Typography, Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUniversities } from '../hooks/useUniversities';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RegisterForm = ({ setNotification }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { universities, loading, error } = useUniversities();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [majors, setMajors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    startYear: '',
    majorId: '',
    status: 'Active',
  });

  const handleUniversityChange = (e) => {
    const universityId = e.target.value;
    setSelectedUniversity(universityId);
    const selectedUni = universities.find(u => u.id === universityId);
    setMajors(selectedUni ? selectedUni.majors : []);
    setFormData(prev => ({ ...prev, majorId: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, formData);
      setNotification({ open: true, message: 'Sikeres regisztráció!', severity: 'success' });
      navigate('/login');
    } catch (error) {
      setNotification({ open: true, message: 'A regisztráció sikertelen!', severity: 'error' });
    }
  };

  if (loading) return <Typography>Kérlek várj, egyetemek betöltése...</Typography>;
  if (error) return <Typography color="error">Hiba történt az egyetemek betöltésekor.</Typography>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: theme.palette.background.default, px: 2 }}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Regisztráció
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Felhasználónév"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Jelszó"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordToggle} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Kezdés éve"
            type="number"
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth required>
            <InputLabel id="university-label">Egyetem</InputLabel>
            <Select
              labelId="university-label"
              value={selectedUniversity}
              onChange={handleUniversityChange}
              label="Egyetem"
            >
              {(Array.isArray(universities) ? universities : []).map((uni) => (
                <MenuItem key={uni.id} value={uni.id}>{uni.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required disabled={!selectedUniversity}>
            <InputLabel id="major-label">Szak</InputLabel>
            <Select
              labelId="major-label"
              name="majorId"
              value={formData.majorId}
              onChange={handleChange}
              label="Szak"
            >
              {majors.map((major) => (
                <MenuItem key={major.id} value={major.id}>{major.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel id="status-label">Státusz</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Státusz"
            >
              <MenuItem value="Active">Aktív</MenuItem>
              <MenuItem value="Passive">Passzív</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
            Regisztráció
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;

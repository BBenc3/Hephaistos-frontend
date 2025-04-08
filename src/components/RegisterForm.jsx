import React, { useState } from 'react';
import {
  TextField, Button, Box, Grid, InputAdornment, Select,
  MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUniversities } from '../hooks/useUniversities'; // Import the hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RegisterForm = ({ setNotification }) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize navigate
  const { universities, loading, error } = useUniversities(); // Use the hook
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
      setNotification({ open: true, message: 'Registration successful!', severity: 'success' });
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setNotification({ open: true, message: 'Registration failed!', severity: 'error' });
    }
  };

  if (loading) return <p>Loading universities...</p>;
  if (error) return <p>Error loading universities.</p>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
      <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={handlePasswordToggle} size="small">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputAdornment>
          )
        }}
      />
      <TextField
        label="Start Year"
        type="number"
        name="startYear"
        value={formData.startYear}
        onChange={handleChange}
      />

      {/* Egyetem választó */}
      <FormControl fullWidth required>
        <InputLabel id="university-label">Egyetem</InputLabel>
        <Select
          labelId="university-label"
          value={selectedUniversity}
          onChange={handleUniversityChange}
        >
          {(Array.isArray(universities) ? universities : []).map((uni) => (
            <MenuItem key={uni.id} value={uni.id}>{uni.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Szak választó */}
      <FormControl fullWidth required disabled={!selectedUniversity}>
        <InputLabel id="major-label">Szak</InputLabel>
        <Select
          labelId="major-label"
          name="majorId"
          value={formData.majorId}
          onChange={handleChange}
        >
          {majors.map((major) => (
            <MenuItem key={major.id} value={major.id}>{major.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Status választó */}
      <FormControl fullWidth required>
        <InputLabel id="status-label">Státusz</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Active">Aktív</MenuItem>
          <MenuItem value="Passive">Passzív</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Regisztráció
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;

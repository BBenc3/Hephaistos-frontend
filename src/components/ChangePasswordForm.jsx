import React, { useState } from 'react';
import { TextField, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Button from '../components/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Minden mezőt ki kell tölteni!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Az új jelszavak nem egyeznek!');
      return;
    }
    setLoading(true);
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.post(
        'https://localhost:5001/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Sikeres jelszóváltoztatás!');
      setErrorMessage('');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      setErrorMessage('Hibás régi jelszó vagy más hiba történt!');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleChangePassword();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5DC',
        width: { xs: '90%', sm: '60%', md: '40%' },
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '3%',
      }}
      onKeyPress={handleKeyPress}
    >
      <Typography variant="h4" gutterBottom>
        Jelszó módosítása
      </Typography>
      <TextField
        label="Régi jelszó"
        type={showOldPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowOldPassword(!showOldPassword)}>
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Új jelszó"
        type={showNewPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Új jelszó megerősítése"
        type='password'
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="success" sx={{ marginTop: 2 }}>
          {successMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{ backgroundColor: '#008080', color: '#fff', '&:hover': { backgroundColor: '#006666' }, width: '90%', marginTop: '5%' }}
        onClick={handleChangePassword}
        disabled={loading}
      >
        {loading ? 'Frissítés...' : 'Jelszó módosítása'}
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
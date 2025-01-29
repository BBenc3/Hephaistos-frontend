import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdate = async () => {
    const userData = { username: username.trim(), email: email.trim() };
    
    if (!userData.username || !userData.email) {
      alert('Hiányzó adatok!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        alert('Sikeres módosítás!');
        navigate('/dashboard');
      } else {
        alert('Hiba történt a frissítés során');
      }
    } catch (error) {
      alert('Hálózati hiba:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Módosítás
      </Typography>
      <TextField
        label="E-mail"
        variant="outlined"
        sx={{ width: '30%' }}
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Felhasználónév"
        variant="outlined"
        sx={{ width: '30%' }}
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant="text"
        onClick={() => navigate('/change-password')}
        sx={{ marginTop: 1 }}
      >
        Jelszó módosítás
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Módosítás
      </Button>
    </Box>
  );
};

export default UserEdit;
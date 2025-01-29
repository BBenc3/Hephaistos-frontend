import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const userData = { username: username.trim(), email: email.trim() };
    
    if (!userData.username || !userData.email) {
      console.error('Hiányzó adatok!');
      return;
    }
    
    try {
      //Method: PUT URL: localhost:5001/api/users/me
      const response = await fetch('http://localhost:3000/update-user', {
        method: 'POST',
        //Missing accesstoken
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        navigate('/dashboard');
      } else {
        //console helyett alert üzenetek
        console.error('Hiba történt a frissítés során');
      }
    } catch (error) {
      console.error('Hálózati hiba:', error);
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

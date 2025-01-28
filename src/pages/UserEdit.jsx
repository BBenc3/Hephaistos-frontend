//Módosítás web a navon elhelyezve, helyezd át a profil fülbe
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    // Add your login or update logic here, e.g., an API call.
    navigate('/dashboard'); // Navigate to another page after login or edit
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'a',
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
        width = "30%"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Felhasználónév"
        variant="outlined"
        width = "30%"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        <a href=''>Jelszó módosítás</a>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ marginTop: 2 }}
      >
        Módosítás
      </Button>
    </Box>
  );
};

export default UserEdit;

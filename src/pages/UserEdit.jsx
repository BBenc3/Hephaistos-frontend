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
    // Hiányzik a hívás a szerverre, majd a válasz alapján a navigáció
    // A feladat a legújabb useredit file hibajavítására szólt ami a felhasználói adatok módosítására szolgál.
    // A hiba oka a JSON hiányos elküldése volt, a text mezőkből nem szedte ki a felhasználói adatokat.
    navigate('/dashboard');
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

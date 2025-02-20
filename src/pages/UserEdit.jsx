import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const UserEdit = () => {
  const { user, isLoggedIn, handleUpdate } = useUserData();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
  }

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
        onClick={() => handleUpdate({ username, email })}
        sx={{ marginTop: 2 }}
      >
        Módosítás
      </Button>
    </Box>
  );
};

export default UserEdit;
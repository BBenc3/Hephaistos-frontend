import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import { useTheme } from '@mui/material/styles';

const UserEdit = () => {
  const theme = useTheme();
  const { user, isLoggedIn, handleUpdate } = useUserData();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
  }

  const handleSubmit = async () => {
    try {
      await handleUpdate({ username, email });
    } catch (err) {
      setError('Hiba történt a módosítás során.');
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
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          padding: '5%',
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Módosítás
      </Typography>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
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
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Módosítás
      </Button>
    </Box>
  );
};

export default UserEdit;
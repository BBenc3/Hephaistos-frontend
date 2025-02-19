import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Hiba történt a felhasználói adatok lekérése közben.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeactivate = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.delete('https://localhost:5001/api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      }
    } catch (err) {
      console.error('Error deactivating profile:', err);
      setError('Hiba történt a profil inaktiválása során.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Felhasználó nem található vagy nincs hitelesítve</Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(2), marginTop: theme.spacing(2) },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Felhasználói profil
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Felhasználónév:</strong> {user.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Létrehozva:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
          <Typography>
            <strong>Szerep:</strong> {user.role}
          </Typography>
          <Typography>
            <strong>Aktív:</strong> {user.active ? 'Igen' : 'Nem'}
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: theme.spacing(3),
          [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'flex-start' },
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate('/editprofile')}
          sx={{ fontSize: '0.8rem', [theme.breakpoints.down('sm')]: { marginBottom: theme.spacing(2) } }}
        >
          Módosítás
        </Button>
        <Button variant="contained" color="error" onClick={handleDeactivate}>
          Profil Inaktiválása
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ marginTop: theme.spacing(2) }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default UserProfile;
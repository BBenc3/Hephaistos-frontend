import React from 'react';
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
import useUserData from '../hooks/useUserData';

const UserProfile = () => {
  const { user, loading, error, handleDeactivate } = useUserData();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
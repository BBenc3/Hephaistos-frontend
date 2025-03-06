import React, { useState } from 'react';
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Avatar,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const UserProfile = () => {
  const { user, loading, error, handleDeactivate, handleUpdate, isLoggedIn } = useUserData();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(user?.phone || '+36');
  const [birthPlace, setBirthPlace] = useState(user?.birthPlace || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [address, setAddress] = useState(user?.address || '');
  const [role, setRole] = useState(user?.role || '');
  const [editMode, setEditMode] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isLoggedIn) {
    navigate('/login');
  }

  const handleSubmit = async () => {
    try {
      await handleUpdate({ firstName, lastName, email, password, phone, birthPlace, birthDate, address, role });
      setEditMode(false);
    } catch (err) {
      setFormError('Hiba történt a módosítás során.');
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
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(2), marginTop: theme.spacing(2), width: '100%' },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#DEE2E6',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2),
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Avatar
            src={user.profilePicturePath || 'https://via.placeholder.com/150'}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, marginRight: theme.spacing(2) }}
          />
          <Button variant="text" onClick={() => navigate('/change-profile-picture')}>
            Profilkép módosítása
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom>
          Profil beállítások
        </Typography>
        <Typography sx={{ marginBottom: theme.spacing(2) }}>
          Állítsd be személyes adatokat, értesítéseket és egyéb preferenciákat, hogy testre szabhasd a profilodat.
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        Felhasználói profil
      </Typography>
      {editMode ? (
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
          {formError && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {formError}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Teljes név"
                variant="outlined"
                fullWidth
                margin="normal"
                value={`${firstName} ${lastName}`}
                onChange={(e) => {
                  const [first, last] = e.target.value.split(' ');
                  setFirstName(first);
                  setLastName(last);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="E-mail cím megváltoztatása"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Jelszó megváltoztatása"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 karakter"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Jelszó megerősítése"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Jelszó mégegyszer"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Telefonszám hozzáadás"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+36"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Születési hely és idő hozzáadás"
                variant="outlined"
                fullWidth
                margin="normal"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="Év/hónap/nap"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Cím hozzáadás"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Válassz..."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Felhasználói szerepkör"
                variant="outlined"
                select
                fullWidth
                margin="normal"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Válassz..."
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
          >
            Módosítás
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Felhasználó név:</strong> {user.username}
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
              onClick={() => setEditMode(true)}
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
        </>
      )}
    </Paper>
  );
};

export default UserProfile;
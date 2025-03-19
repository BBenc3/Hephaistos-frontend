import React, { useState, useEffect } from 'react';
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserData from '../hooks/useUserData';
import { useDarkMode } from '../hooks/useDarkMode';

const UserProfile = () => {
  const { user, loading, error, handleDeactivate, isLoggedIn, handleProfilePictureUpload } = useUserData();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDarkMode] = useDarkMode();

  const [firstName, setFirstName] = useState(user?.userdata?.firstName || '');
  const [lastName, setLastName] = useState(user?.userdata?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(user?.phoneNumber || '+36');
  const [birthPlace, setBirthPlace] = useState(user?.userdata?.birthPlace || '');
  const [birthDate, setBirthDate] = useState(user?.userdata?.birthDate || '');
  const [address, setAddress] = useState(user?.userdata?.address || '');
  const [role, setRole] = useState(user?.role || '');
  const [motherName, setMotherName] = useState(user?.userdata?.motherName || '');
  const [university, setUniversity] = useState(user?.userdata?.university || '');
  const [faculty, setFaculty] = useState(user?.userdata?.faculty || '');
  const [studyStatus, setStudyStatus] = useState(user?.userdata?.studyStatus || '');
  const [subjectName, setSubjectName] = useState(user?.userdata?.subjectName || '');
  const [subjectCode, setSubjectCode] = useState(user?.userdata?.subjectCode || '');
  const [subjectType, setSubjectType] = useState(user?.userdata?.subjectType || '');
  const [editMode, setEditMode] = useState(false);
  const [formError, setFormError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [ftpImages, setFtpImages] = useState([]);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(user?.profilePicturePath || 'ftp://Hephaistos@ftp.nethely.hu/default.png');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFtpImages();
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const fetchFtpImages = async () => {
    try {
      const response = await axios.get('https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/Ftp/list');
      setFtpImages(response.data); // assuming response.data contains an array of image file names
    } catch (err) {
      console.error('Error fetching FTP images', err);
    }
  };

  const handleProfilePictureChange = (imagePath) => {
    setSelectedProfilePicture(imagePath);
  };

  const handleSubmit = async () => {
    try {
      await axios.put('https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/users/me', {
        firstName,
        lastName,
        email,
        password,
        phone,
        birthPlace,
        birthDate,
        address,
        role,
        motherName,
        university,
        faculty,
        studyStatus,
        subjectName,
        subjectCode,
        subjectType,
        profilePicture: selectedProfilePicture,
      });
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
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: { padding: theme.spacing(2), marginTop: theme.spacing(2), width: '100%' },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#DEE2E6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2),
          flexDirection: 'row',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={selectedProfilePicture || 'ftp://Hephaistos@ftp.nethely.hu/default.png'}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, marginBottom: theme.spacing(1) }}
          />
          <Button variant="text" component="label">
            Profilkép módosítása
            <input type="file" hidden onChange={handleProfilePictureChange} />
          </Button>
          <Button variant="contained" onClick={handleProfilePictureUpload}>
            Feltöltés
          </Button>
          <Typography sx={{ marginTop: theme.spacing(2) }}>Válassz előre feltötltöttképet:</Typography>
          <List>
            {ftpImages.map((image) => (
              <ListItem button key={image} onClick={() => handleProfilePictureChange(image)}>
                <ListItemAvatar>
                  <Avatar src={`ftp://Hephaistos@ftp.nethely.hu/${image}`} />
                </ListItemAvatar>
                <ListItemText primary={image} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ textAlign: 'center', margin: '0 auto' }}>
          <Typography variant="h4" gutterBottom>
            Profil beállítások
          </Typography>
          <Typography sx={{ marginBottom: theme.spacing(2) }}>
            Állítsd be személyes adatokat, értesítéseket és egyéb preferenciákat, hogy testre szabhasd a profilodat.
          </Typography>
        </Box>
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
          <Box
            sx={{
              border: '1px solid #00000033', // 20% opacity
              borderRadius: '0%',
              padding: theme.spacing(2),
              width: '100%',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Keresztnév"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Vezetéknév"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  label="Születési dátum"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
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
                  label="Anyja neve"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
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
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Egyetem neve"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Kar"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Tanulmányi státusz"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={studyStatus}
                  onChange={(e) => setStudyStatus(e.target.value)}
                  select
                >
                  <MenuItem value="Aktív">Aktív</MenuItem>
                  <MenuItem value="Passzív">Passzív</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Tantárgy neve"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Tantárgy kódja"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Kötelező vagy választható tárgy"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={subjectType}
                  onChange={(e) => setSubjectType(e.target.value)}
                  select
                >
                  <MenuItem value="Kötelező">Kötelező</MenuItem>
                  <MenuItem value="Választható">Választható</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
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
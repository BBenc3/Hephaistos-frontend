import React, { useState } from 'react';
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import axios from 'axios';

const UserProfile = () => {
  const { user, loading, error, handleDeactivate } = useUserData();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://localhost:5001/api/users/me/profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("Profile picture uploaded successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
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
      <Typography variant="h5" gutterBottom>
        Felhasználói profil
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Avatar
            src={user.profilePicturePath || 'https://via.placeholder.com/150'}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, marginBottom: theme.spacing(2) }}
          />
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
          onClick={() => navigate('/editprofile')}
          sx={{ fontSize: '0.8rem', [theme.breakpoints.down('sm')]: { marginBottom: theme.spacing(2) } }}
        >
          Módosítás
        </Button>
        <Button variant="contained" color="error" onClick={handleDeactivate}>
          Profil Inaktiválása
        </Button>
      </Box>
      <Box sx={{ marginTop: theme.spacing(3) }}>
        <input type="file" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleFileUpload} sx={{ marginTop: theme.spacing(1) }}>
          Profilkép feltöltése
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
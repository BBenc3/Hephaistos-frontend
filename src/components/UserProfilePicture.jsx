import React, { useState } from 'react';
import { Avatar, Button, Box, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';

const UserProfilePicture = ({ selectedProfilePicture, handleProfilePictureChange, ftpImages }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const displayAvatar = 'http://files.hephaistos.nhely.hu/ProjectHephaistos/ProfilePictures/default.png' || selectedProfilePicture;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setProfilePicture(file);
    } else {
      setUploadStatus('Csak JPG és PNG fájlok tölthetők fel.');
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) {
      setUploadStatus('Kérlek válassz egy képet!');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.put(
        'https://hephaistos-backend-c6c5ewhraedvgzex.germanywestcentral-01.azurewebsites.net/api/User/uploadProfilePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus('Profilkép sikeresen feltöltve!');
        handleProfilePictureChange(response.data.profilePicturePath);
      } else {
        throw new Error('Hiba történt a profilkép feltöltése során');
      }
    } catch (error) {
      setUploadStatus('Hálózati hiba: ' + error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        src={displayAvatar}
        alt="Profile Picture"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Button variant="text" component="label">
        Profilkép módosítása
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Button variant="contained" onClick={handleProfilePictureUpload}>
        Feltöltés
      </Button>
      {uploadStatus && (
        <Typography sx={{ marginTop: 2, color: uploadStatus.includes('sikeresen') ? 'green' : 'red' }}>
          {uploadStatus}
        </Typography>
      )}
      <Typography sx={{ marginTop: 2 }}>Válassz előre feltöltött képet:</Typography>
      <List>
        {ftpImages.map((image) => (
          <ListItem button key={image} onClick={() => handleProfilePictureChange(`http://files.hephaistos.nhely.hu/ProjectHephaistos/ProfilePictures/Users/${image}`)}>
            <ListItemAvatar>
              <Avatar src={`http://files.hephaistos.nhely.hu/ProjectHephaistos/ProfilePictures/Users/${image}`} />
            </ListItemAvatar>
            <ListItemText primary={image} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserProfilePicture;

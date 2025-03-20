import React from 'react';
import { Avatar, Button, Box, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const UserProfilePicture = ({ selectedProfilePicture, handleProfilePictureChange, handleProfilePictureUpload, ftpImages }) => {
  const displayAvatar = 'http://files.hephaistos.nhely.hu/ProjectHephaistos/ProfilePictures/default.png';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        src={displayAvatar}
        alt="Profile Picture"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Button variant="text" component="label">
        Profilkép módosítása
        <input type="file" hidden onChange={(e) => handleProfilePictureChange(e.target.files[0])} />
      </Button>
      <Button variant="contained" onClick={handleProfilePictureUpload}>
        Feltöltés
      </Button>
      <Typography sx={{ marginTop: 2 }}>Válassz előre feltötltöttképet:</Typography>
      <List>
        {ftpImages.map((image) => (
          <ListItem button key={image} onClick={() => handleProfilePictureChange(image)}>
            <ListItemAvatar>
              <Avatar src={`http://files.hephaistos.nhely.hu/ProjectHephaistos/ProfilePictures/${image}`} />
            </ListItemAvatar>
            <ListItemText primary={image} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserProfilePicture;

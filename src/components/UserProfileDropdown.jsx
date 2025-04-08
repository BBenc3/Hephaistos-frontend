import React from "react";
import { MenuItem, Avatar, Typography, IconButton } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CustomDropdown from "./CustomDropdown";
import { useNavigate } from 'react-router-dom';
import useUserData from "../hooks/useUserData";

const UserProfileDropdown = ({ anchorEl, onMenuClick, onMenuClose }) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUserData();

  const handleLogoutClick = () => {
    logout();
    onMenuClose();
  };

  const profileBaseUrl = process.env.REACT_APP_PROFILE_PICTURE_BASE_URL || "";
  const displayAvatar = user?.profilePicturePath
    ? `${profileBaseUrl}ProfilePictures/${user.profilePicturePath}`
    : "https://via.placeholder.com/40";
  const displayName = user?.username || "Felhasználó név";

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={onMenuClick}
        color="inherit"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          padding: "10px",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          marginRight: theme.spacing(1),
          [theme.breakpoints.down('sm')]: {
            padding: '3px',
            fontSize: '0.8rem',
          },
        }}
      >
        <Avatar
          src={displayAvatar}
          alt={`${displayName} Profile Picture`}
          sx={{ width: 30, height: 30, [theme.breakpoints.down('sm')]: { width: 25, height: 25 } }}
        />
        <Typography variant="body1" sx={{ marginLeft: "8px", [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' } }}>
          {displayName}
        </Typography>
      </IconButton>

      <CustomDropdown anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem onClick={() => { navigate('/profile'); onMenuClose(); }}>Felhasználói profil</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Kijelentkezés</MenuItem>
      </CustomDropdown>
    </Box>
  );
};

export default UserProfileDropdown;

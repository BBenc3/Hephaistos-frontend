import React from "react";
import { MenuItem, Avatar, Typography, IconButton } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"; // Ensure this path is correct
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CustomDropdown from "./CustomDropdown";
import { useNavigate } from 'react-router-dom';

const UserProfileDropdown = ({ anchorEl, onMenuClick, onMenuClose, user }) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    onMenuClose();
  };

  const displayAvatar = user?.profilePicturePath || "https://via.placeholder.com/40"; // Use profile picture if available
  const displayName = user?.username || "Felhasználó név"; // Use username if available

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Wrap with Box for layout */}
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
          marginRight: theme.spacing(1), // Add some spacing
          [theme.breakpoints.down('sm')]: { // Responsive styles
            padding: '3px',
            fontSize: '0.8rem',
          },
        }}
      >
        <Avatar src={displayAvatar} alt={displayName} sx={{ width: 30, height: 30, [theme.breakpoints.down('sm')]: { width: 25, height: 25 } }} />
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
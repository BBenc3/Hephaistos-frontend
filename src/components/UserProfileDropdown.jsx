import React, { useState } from "react";
import { Menu, MenuItem, Avatar, Typography, IconButton } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"; // Ensure this path is correct
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const UserProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  const displayAvatar = "https://via.placeholder.com/40"; // Placeholder avatar URL
  const displayName = user?.username || "Felhasználó név"; // Use username if available

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Wrap with Box for layout */}
      <IconButton
        onClick={handleMenuOpen}
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
        <Avatar src={user?.avatar || displayAvatar} alt={displayName} sx={{ width: 30, height: 30, [theme.breakpoints.down('sm')]: { width: 25, height: 25 } }} />
        <Typography variant="body1" sx={{ marginLeft: "8px", [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' } }}>
          {displayName}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          },
        }}
      > 
        <MenuItem onClick={handleMenuClose}>Felhasználói profil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Profilbeállítások</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Kijelentkezés</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfileDropdown;
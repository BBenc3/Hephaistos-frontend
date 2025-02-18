// UserProfileDropdown.jsx
import React, { useState } from "react";
import { Menu, MenuItem, Avatar, Typography, IconButton } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const UserProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, handleLogout } = useAuth(); // Feltételezve, hogy a felhasználó adatokat az AuthContext biztosítja

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleMenuClose();
  };

  const placeholderName = "Felhasználó név"; // Placeholder név
  const placeholderAvatar = "https://via.placeholder.com/40"; // Placeholder avatar URL

  const displayName = user?.name || placeholderName; // Ha nincs név, használjuk a placeholdert
  const displayAvatar = user?.avatar || placeholderAvatar; // Ha nincs avatar, használjuk a placeholdert

  return (
    <>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar src={displayAvatar} alt={displayName} />
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {displayName} ({user?.role || "Nincs szerep"})
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "#166B6B", // Itt állítjuk be a háttérszínt
            color: "#ffffff", // Fehér szöveg a sötét háttérhez
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Fiók beállítások</MenuItem>
        <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Kijelentkezés</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileDropdown;

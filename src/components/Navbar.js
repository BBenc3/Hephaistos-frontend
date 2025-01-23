import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ellenőrizzük, hogy van-e elmentett accessToken a cookie-kban
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    setIsLoggedIn(!!token); // Ha van token, akkor igaz.
  }, []);

  const handleLogout = () => {
    // Cookie-k törlése kijelentkezéskor
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hephaistos
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>Főoldal</MenuItem>
          <MenuItem component={Link} to="/schedule" onClick={handleMenuClose}>Órarend</MenuItem>
          <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Kapcsolat</MenuItem>
          {isLoggedIn ? (
            <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Kijelentkezés</MenuItem>
          ) : (
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Bejelentkezés</MenuItem>
          )}
        </Menu>
        <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', md: 'block' } }}>
          Főoldal
        </Button>
        <Button color="inherit" component={Link} to="/schedule" sx={{ display: { xs: 'none', md: 'block' } }}>
          Órarend
        </Button>
        <Button color="inherit" component={Link} to="/contact" sx={{ display: { xs: 'none', md: 'block' } }}>
          Kapcsolat
        </Button>
        {isLoggedIn ? (
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'block' } }}
          >
            Kijelentkezés
          </Button>
        ) : (
          <Button 
            color="inherit" 
            component={Link} 
            to="/login" 
            sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'block' } }}
          >
            Bejelentkezés
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    setIsLoggedIn(!!token); // Ha van token, akkor igaz.
  }, [document.cookie]);

  const handleLogout = () => {
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
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
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
        </div>
        <div style={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">
            Főoldal
          </Button>
          <Button color="inherit" component={Link} to="/schedule">
            Órarend
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Kapcsolat
          </Button>
          {isLoggedIn ? (
            <Button 
              color="inherit" 
              onClick={handleLogout} 
              sx={{ marginLeft: 'auto' }}
            >
              Kijelentkezés
            </Button>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login" 
              sx={{ marginLeft: 'auto' }}
            >
              Bejelentkezés
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the hook

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth(); // Use the global auth state
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    // Remove accessToken from localStorage
    localStorage.removeItem('accessToken');
    
    // Clear refreshToken from cookies
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Call handleLogout to update the global state
    handleLogout();
    
    // Redirect to the login page
    navigate('/login');
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
              <>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profil</MenuItem>
                <MenuItem onClick={() => { logout(); handleMenuClose(); }}>Kijelentkezés</MenuItem>
              </>
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
            <>
              <Button color="inherit" component={Link} to="/profile" sx={{ marginLeft: 'auto' }}>
                Profil
              </Button>
              <Button 
                color="inherit" 
                onClick={logout} 
                sx={{ marginLeft: 'auto' }}
              >
                Kijelentkezés
              </Button>
            </>
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

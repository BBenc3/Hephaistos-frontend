import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    if (!isSmallScreen) {
      setAnchorEl(null); // Menü bezárása, ha visszaváltunk asztali nézetre
    }
  }, [isSmallScreen]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hephaistos
        </Typography>

        {/* Asztali nézetben a gombok láthatók, nincs menü ikon */}
        {!isSmallScreen ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
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
                <Button color="inherit" component={Link} to="/profile">
                  Profil
                </Button>
                <Button color="inherit" onClick={logout}>
                  Kijelentkezés
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Bejelentkezés
              </Button>
            )}
          </Box>
        ) : (
          /* Mobil nézetben csak a menü ikon jelenik meg */
          <Box>
            <IconButton
              size="large"
              color="inherit"
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
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

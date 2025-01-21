import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hephaistos
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Főoldal
        </Button>
        <Button color="inherit" component={Link} to="/schedule">
          Órarend
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Kapcsolat
        </Button>
        {/* Bejelentkezés gomb */}
        <Button 
          color="inherit" 
          component={Link} 
          to="/login" 
          sx={{ marginLeft: 'auto' }} // Jobbra igazítás
        >
          Bejelentkezés
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import './HeroSection.css'; // Importáld a CSS fájlt

const HeroSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className="hero"
      sx={{
        backgroundColor: theme.palette.primary.main, // Háttérszín a témából
        padding: isSmallScreen ? theme.spacing(3) : theme.spacing(6), // Reszponzív padding
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row', // Függőleges elrendezés kisebb képernyőkön
        alignItems: 'center',
        position: 'relative', // Pozícionálás a kivágáshoz
      }}
    >
      <Box
        className="hero-image-container"
        sx={{
          width: isSmallScreen ? '100%' : 'auto', // Kép szélessége kisebb képernyőkön
          marginBottom: isSmallScreen ? theme.spacing(3) : 0, // Térköz a kép alatt kisebb képernyőkön
          marginRight: isSmallScreen ? 0 : theme.spacing(6), // Térköz a képtől jobbra nagyobb képernyőkön
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="hero-logo"
          style={{ maxWidth: '100%', height: 'auto' }} // Kép méretének korlátozása
        />
        <Box className="hero-cutout" sx={{ zIndex: -1 }} /> {/* Kivágás a kép mögött */}
      </Box>
      <Box className="hero-text-content">
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main, // Szövegszín a témából
            marginBottom: theme.spacing(2),
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          scelerisque, orci non dictum mattis, arcu diam viverra elit, in
          viverra risus nisi eu elit. Nam et libero ut nisi rhoncus pretium.
          Cras tincidunt, ex vitae condimentum auctor, lectus nisi lacinia...
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            float: 'right',
            bottom: isSmallScreen ? theme.spacing(3) : theme.spacing(6),
            left: isSmallScreen ? theme.spacing(3) : theme.spacing(6),
          }}
        >
          Rólunk
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
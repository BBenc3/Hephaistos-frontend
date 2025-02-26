import React, { useState } from 'react';
import { Box, Typography, Button, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HeroSection = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        outline: `3px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        [theme.breakpoints.down('sm')]: {
          p: 2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Hephaistos Logo"
          sx={{
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
            mr: { md: 2 },
            mb: { xs: 2, md: 0 },
          }}
        />
        <Typography variant="h3" component="h1">
          Hephaistos
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        A középiskolai projektünk célja egy olyan egyetemi órarendgeneráló alkalmazás
        kifejlesztése, amely segíti a diákokat az órarendjük megtervezésében,
        minimalizálva az ütközéseket és a szabadidő-kieséseket. Az alkalmazásunk abban nyújt segítséget, hogy optimalizált órarendet készítsen, figyelembe véve a követelményeket és az előfeltételeket.
      </Typography>

      {/* Collapse komponens az animációhoz */}
      <Collapse in={expanded}>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Ez az alkalmazás nemcsak azoknak a diákoknak nyújt megoldást, akik késésben vannak
          a tanulmányaikkal, hanem azoknak is, akik előre szeretnék látni a lehetséges
          életét, csökkenti a stresszt és növeli a tanulmányi hatékonyságot. Az alkalmazás
          értesítéseket és emlékeztetőket küld a felhasználóknak a közelgő óráikról és fontos
          határidőkről.
        </Typography>
      </Collapse>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleToggle}>
          {expanded ? 'Bezárás' : 'Rólunk'}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;

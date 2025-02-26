import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeroSection from '../components/HeroSection/HeroSection';
import InfoCard from '../components/InfoCard';

const Home = ({ isMobile }) => {
  const theme = useTheme();
  const infoCardRef = useRef(null);

  const descriptions = {
    simple: "Gyorsan és egyszerűen generálhat órarendet néhány kattintással. Ez az alkalmazás segít a diákoknak az órarendjük megtervezésében, minimalizálva az ütközéseket és a szabadidő-kieséseket. Az alkalmazás értesítéseket és emlékeztetőket küld a közelgő órákról és fontos határidőkről. Célunk, hogy megkönnyítsük a hallgatók életét és növeljük a tanulmányi hatékonyságot.",
    advanced: "Haladó beállításokkal testreszabhatja az órarend generálását. Ez az alkalmazás segít a diákoknak az órarendjük megtervezésében, minimalizálva az ütközéseket és a szabadidő-kieséseket. Az alkalmazás értesítéseket és emlékeztetőket küld a közelgő órarendekről és fontos határidőkről. Célunk, hogy megkönnyítsük a hallgatók életét és növeljük a tanulmányi hatékonyságot.",
    custom: "Teljesen egyedi órarendet hozhat létre saját igényei szerint. Ez az alkalmazás segít a diákoknak az órarendjük megtervezésében, minimalizálva az ütközéseket és a szabadidő-kieséseket. Az alkalmazás értesítéseket és emlékeztetőket küld a közelgő órarendekről és fontos határidőkről. Célunk, hogy megkönnyítsük a hallgatók életét és növeljük a tanulmányi hatékonyságot."
  };

  return (
    <Container sx={{ mt: 4, [theme.breakpoints.down('sm')]: { mt: 2, padding: '10px', height:'200vh' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', mt: '20vh' }}>
        <HeroSection />
      </Box>
      <Box sx={{ height: '30vh' }} /> {/* Add more padding here */}
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Funkciók
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }} ref={infoCardRef}>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Gyors Generálás"
            description={descriptions.simple}
            delay={0}
            theme={theme}
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Haladó Generálás"
            description={descriptions.advanced}
            delay={300}
            theme={theme}
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Egyedi Generálás"
            description={descriptions.custom}
            delay={600}
            theme={theme}
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

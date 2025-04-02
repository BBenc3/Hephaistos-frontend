import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Sliders, Clock, Calendar4Event } from 'react-bootstrap-icons';
import HeroSection from '../components/HeroSection';
import InfoCard from '../components/InfoCard';

const Home = ({ isMobile }) => {
  const theme = useTheme();
  const infoCardRef = useRef(null);

  const descriptions = {
    simple: "Kezdd el az órarend generálását pillanatok alatt! Egyszerű felületünk segítségével még a bonyolult időbeosztások is könnyedén kezelhetők.",
    advanced: "Adj meg saját preferenciáidat – válaszd ki a kurzusaidat, időpontjaidat és szabadidődet! A Hephaistos minden igényedhez alkalmazkodik.",
    custom: "A Hephaistos intelligens algoritmusai segítenek a lehető legjobb időbeosztást megtalálni, hogy minden kurzusod kényelmesen beleférjen a napirendedbe.",
  };

  const icons = {
    simple: Clock,
    advanced: Sliders,
    custom: Calendar4Event,
  };

  return (
    <Container sx={{ mt: 15 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <HeroSection />
      </Box>
      <Box sx={{ mt: 20 }} /> {/* Add more padding here */}
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Funkciók
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }} ref={infoCardRef}>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Gyors és Egyszerű"
            description={descriptions.simple}
            delay={0}
            theme={theme}
            icon={icons.simple} // Pass icon prop correctly
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Személyre szabott órarend"
            description={descriptions.advanced}
            delay={300}
            theme={theme}
            icon={icons.advanced} // Pass icon prop correctly
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Intelligens időbeosztás"
            description={descriptions.custom}
            delay={600}
            theme={theme}
            icon={icons.custom} // Pass icon prop correctly
            sx={{ height: '100%' }} // Ensure equal height
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

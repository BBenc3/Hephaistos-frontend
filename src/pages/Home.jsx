import React, { useEffect, useRef } from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';
import { useTheme, lighten } from '@mui/material/styles';
import { Sliders, Clock, Calendar4Event } from 'react-bootstrap-icons';
import HeroSection from '../components/HeroSection';
import InfoCard from '../components/InfoCard';

const Home = ({ isMobile }) => {
  const theme = useTheme();
  const infoCardRef = useRef(null);

  // Marketing kártyák adatai: a primary színből generált világosabb árnyalatok
  const marketingCards = [
    {
      title: "Egyszerű és gyors",
      description: "Villámgyors órarend-generálás, hogy több időt tölthess a fontos dolgokkal.",
      // Világosabb árnyalat a primary színnél (pl. +60% light)
      bgColor: lighten(theme.palette.primary.main, 0.6),
      icon: Clock,
    },
    {
      title: "Teljesen személyre szabott",
      description: "Állítsd össze az órarended úgy, hogy az pontosan a te igényeidhez igazodjon!",
      // Egy kicsit kevesebb lightening, de még világosabb a primary színnél (pl. +40% light)
      bgColor: lighten(theme.palette.primary.main, 0.4),
      icon: Sliders,
    },
    {
      title: "Intelligens megoldások",
      description: "Fejlett algoritmusaink segítenek a legjobb időbeosztás megtalálásában minden kurzushoz.",
      // Minimalizált lightening, de még világosabb, mint a primary main (pl. +20% light)
      bgColor: lighten(theme.palette.primary.main, 0.2),
      icon: Calendar4Event,
    },
  ];

  const descriptions = {
    simple: "Kezdd el az órarend generálását pillanatok alatt! Egyszerű felületünk segítségével a legbonyolultabb időbeosztások is könnyedén kezelhetők.",
    advanced: "Adj meg saját preferenciáidat – válaszd ki kurzusaidat, időpontjaidat és szabadidődet! A Hephaistos minden igényedhez alkalmazkodik.",
    custom: "Az intelligens algoritmusaink segítenek megtalálni a lehető legjobb időbeosztást, hogy minden kurzusod kényelmesen beleférjen a napirendedbe.",
  };

  const icons = {
    simple: Clock,
    advanced: Sliders,
    custom: Calendar4Event,
  };

  return (
    <Container sx={{ mt: 15 }}>
      {/* HeroSection változatlanul */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <HeroSection />
      </Box>

      {/* Marketing kártyák rész */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Miért válaszd a Hephaistost?
        </Typography>
        <Grid container spacing={4}>
          {marketingCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    backgroundColor: card.bgColor,
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <IconComponent size={40} color={theme.palette.text.primary} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {card.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Funkciók rész */}
      <Box sx={{ mt: 20 }} />
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Fedezd fel a funkciókat
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }} ref={infoCardRef}>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Gyors és Egyszerű"
            description={descriptions.simple}
            delay={0}
            theme={theme}
            icon={icons.simple}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Személyre szabott órarend"
            description={descriptions.advanced}
            delay={300}
            theme={theme}
            icon={icons.advanced}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoCard
            title="Intelligens időbeosztás"
            description={descriptions.custom}
            delay={600}
            theme={theme}
            icon={icons.custom}
            sx={{ height: '100%' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
  
import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeroSection from '../components/HeroSection/HeroSection';
import InfoCard from '../components/InfoCard';

const Home = ({ isMobile }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const infoCardRef = useRef(null);

  const handleScroll = () => {
    if (infoCardRef.current) {
      const rect = infoCardRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container sx={{ mt: 4, [theme.breakpoints.down('sm')]: { mt: 2, padding: '10px' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', mt: '20vh' }}>
        <HeroSection />
      </Box>
      <Box sx={{ height: '30vh' }} /> {/* Add more padding here */}
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Funkciók
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }} ref={infoCardRef}>
        <Grid item xs={12} sm={4} sx={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
          <InfoCard
            title="Egyszerű és Gyors Generálás"
            description="Gyorsan és egyszerűen generálhat órarendet néhány kattintással."
            delay={0}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
          <InfoCard
            title="Haladó Generálás"
            description="Haladó beállításokkal testreszabhatja az órarend generálását."
            delay={300}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
          <InfoCard
            title="Egyedi Generálás"
            description="Teljesen egyedi órarendet hozhat létre saját igényei szerint."
            delay={600}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

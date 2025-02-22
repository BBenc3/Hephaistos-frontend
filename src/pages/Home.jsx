import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeroSection from '../components/HeroSection/HeroSection';

const Home = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Container sx={{ mt: 4, [theme.breakpoints.down('sm')]: { mt: 2, padding: '10px' } }}>
      
      <HeroSection />
    </Container>
  );
};

export default Home;

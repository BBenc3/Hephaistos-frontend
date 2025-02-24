import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const InfoCard = ({ title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const cardPosition = document.getElementById(title).offsetTop;
      if (scrollPosition > cardPosition) {
        setTimeout(() => setIsVisible(true), delay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [title, delay]);

  return (
    <Box
      id={title}
      className="info-card"
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        outline: `2px solid ${theme.palette.primary.main}`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">További információ</Button>
          <Button size="small" variant="contained" color="primary">Próbálja ki</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default InfoCard;

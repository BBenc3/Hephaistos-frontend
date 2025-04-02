import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const errorMessages = {
  404: 'Az oldal nem található',
  default: 'Ismeretlen hiba történt',
};

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorCode = location.state?.errorCode || 404;
  const errorMessage = errorMessages[errorCode] || errorMessages.default;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" mr={isMobile ? 0 : 4}>
          <Typography variant="h4" gutterBottom>
            Ooops....
          </Typography>
          <Typography variant="h5" gutterBottom>
            {errorMessage}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoHome}>
            Vissza a főoldalra
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" gutterBottom>
            {errorCode}
          </Typography>
          <Box component="img" src="/Error.png" alt="Error" sx={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;

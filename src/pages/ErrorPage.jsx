import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ErrorPage.css'; // Import the new CSS file

const errorMessages = {
  401: 'Nem vagy jogosult az oldal megtekintésére',
  404: 'Az oldal nem található',
  405: 'A kért művelet nem engedélyezett',
  500: 'Belső szerver hiba',
  503: 'Szolgáltatás nem elérhető',
  default: 'Ismeretlen hiba történt',
};

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorCode = location.state?.errorCode || 404;
  const errorMessage = errorMessages[errorCode] || errorMessages.default;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="error-container">
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" justifyContent="center" className="error-box">
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" className="error-text-box" mr={isMobile ? 0 : 4}>
          <div>
            <Typography variant="h4" className="error-title" gutterBottom>
              Ooops....
            </Typography>
          </div>
          <div>
            <Typography variant="h5" className="error-subtitle" gutterBottom>
              {errorMessage}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="error-description" gutterBottom>
              Elnézést, a keresett oldal nem található.
            </Typography>
          </div>
          <Button variant="contained" color="primary" onClick={handleGoHome} className="error-button">
            Vissza a főoldalra
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" className="error-image-box">
          <Typography variant="h3" className="error-code" gutterBottom>
            {errorCode}
          </Typography>
          <img src="/Error.png" alt="Error" className="error-image" draggable="false" onDragStart={(e) => e.preventDefault()} />
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;

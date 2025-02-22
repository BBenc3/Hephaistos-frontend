import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ForgotPasswordButton = ({ navigate, failedAttempts }) => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  return (
    <Typography
      variant="body2"
      sx={{
        color: theme.palette.primary.main,
        cursor: 'pointer',
        opacity: 0.7, // Make the text translucent
        marginTop: '10px',
        textAlign: 'center',
        animation: animate ? 'flash 1s' : 'none',
        '&:hover': {
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        },
        '@keyframes flash': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      }}
      onClick={() => navigate('/forgotpassword')}
    >
      Elfelejtettem a jelszavam!
    </Typography>
  );
};

export default ForgotPasswordButton;

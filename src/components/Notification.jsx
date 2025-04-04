import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Notification = ({ open, message, severity, onClose, ownerState, ...otherProps }) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (severity) {
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.background.default;
    }
  };

  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'successful':
        return <CheckCircleIcon />;
      default:
        return null;
    }
  };

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      TransitionComponent={TransitionUp}
      {...otherProps}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          backgroundColor: getBackgroundColor(),
          color: theme.palette.common.white,
        }}
        {...otherProps}
      >
        {getIcon()}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

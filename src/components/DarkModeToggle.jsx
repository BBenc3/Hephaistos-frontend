import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={handleToggle} />}
      label="Dark Mode"
    />
  );
};

export default DarkModeToggle;

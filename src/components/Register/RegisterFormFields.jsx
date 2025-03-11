import React, { useState } from 'react';
import { TextField, Box, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const RegisterFormFields = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMessage,
  onKeyPress,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();

  const inputStyles = {
    width: { xs: '100%', md: '48%' },
    marginBottom: 2,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        },
      }}
    >
      <TextField
        label="Felhasználónév"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={inputStyles}
        onKeyPress={onKeyPress}
      />

      <TextField
        label="E-mail"
        type="email"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={inputStyles}
        onKeyPress={onKeyPress}
      />

      <TextField
        label="Jelszó"
        variant="outlined"
        fullWidth
        required
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        sx={inputStyles}
        onKeyPress={onKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Jelszó megjelenítése/elrejtése"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Jelszó ismét"
        variant="outlined"
        fullWidth
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        sx={inputStyles}
        onKeyPress={onKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Jelszó ismét megjelenítése/elrejtése"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {errorMessage && (
        <Typography color="error" sx={{ width: '100%', mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default RegisterFormFields;

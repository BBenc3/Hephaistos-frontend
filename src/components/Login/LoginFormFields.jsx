import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const LoginFormFields = ({
  usernameOrEmail,
  setusernameOrEmail,
  password,
  setPassword,
  errorMessage,
  navigate,
  onKeyDown,
  onKeyPress,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <>
      <TextField
        label="Felhasználónév vagy Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={usernameOrEmail}
        onChange={(e) => setusernameOrEmail(e.target.value)}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        required
        color="primary"
      />
      <TextField
        label="Jelszó"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        color="primary"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default LoginFormFields;

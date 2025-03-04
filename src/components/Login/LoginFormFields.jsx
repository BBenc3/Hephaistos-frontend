import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const LoginFormFields = ({
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  navigate, // Add navigate as a prop
  onKeyPress, // Add onKeyPress as a prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={onKeyPress} // Add this line
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
        onKeyPress={onKeyPress} // Add this line
        color="primary"

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
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default LoginFormFields;

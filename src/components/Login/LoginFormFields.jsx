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
        color="primary"
        sx={{
          backgroundColor: theme.palette.mode === 'dark' && !email ? 'white' : 'inherit',
          '& .MuiInputBase-input': {
            color: theme.palette.mode === 'dark' && !email ? 'white' : 'inherit',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
      <TextField
        label="Jelszó"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        color="primary"
        sx={{
          backgroundColor: theme.palette.mode === 'dark' && !password ? 'white' : 'inherit',
          '& .MuiInputBase-input': {
            color: theme.palette.mode === 'dark' && !password ? 'white' : 'inherit',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
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

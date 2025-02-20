import React, { useState } from 'react';
import { TextField, Box, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const darkColors = {
  background: '#333',
  text: '#fff',
};

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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField 
          label="Teljes név" 
          variant="outlined" 
          fullWidth 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          color="primary"
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' && !username ? darkColors.background : 'inherit',
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
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
          }}
        />
        <TextField 
          label="E-mail" 
          variant="outlined" 
          fullWidth 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          color="primary"
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' && !email ? darkColors.background : 'inherit',
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
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Jelszó"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="primary"
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' && !password ? darkColors.background : 'inherit',
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
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
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
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          color="primary"
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' && !confirmPassword ? darkColors.background : 'inherit',
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
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? darkColors.text : 'inherit',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Már van fiókod?{' '}
        <Typography
          component="span"
          sx={{ color: theme.palette.primary.main, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Jelentkezz be
        </Typography>
      </Typography>
    </>
  );
};

export default RegisterFormFields;

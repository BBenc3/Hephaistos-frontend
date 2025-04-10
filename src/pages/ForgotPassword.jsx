import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, TextField } from "@mui/material";

const ForgotPassword = () => {
  const theme = useTheme();
  const { requestOtp, verifyOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      await requestOtp(email);
      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await verifyOtp(email, otp, newPassword);
      console.log('Password changed successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (step === 1) {
        handleSendOtp();
      } else if (step === 2) {
        handleResetPassword();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          [theme.breakpoints.down('sm')]: { padding: '10px' }
        }}
      >
        <Box sx={{ flexGrow: 1, padding: "3%", textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <Typography variant="h4" gutterBottom>
            Elfelejtett jelszó
          </Typography>
          <Typography variant="body1" gutterBottom>
            add meg az egyszeri hitelesítési kódod
          </Typography>
          {step === 1 && (
            <>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email címed"
                sx={{ marginBottom: "16px" }}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleSendOtp}>Jelszó helyreállítása</Button>
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                fullWidth
                label="Egyszeri hitelesítési kód"
                type="text"
                value={otp}
                autoComplete='one-time-code'
                onChange={(e) => setOtp(e.target.value)}
                sx={{ marginBottom: "16px" }}
                onKeyPress={handleKeyPress}
              />
              <TextField
                fullWidth
                label="Új jelszó"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ marginBottom: "16px" }}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleResetPassword}>Jelszó módosítása</Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

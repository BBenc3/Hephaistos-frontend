import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import { useTheme } from '@mui/material/styles';

const ForgotPassword = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      // ...existing code for sending OTP...
      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      // ...existing code for verifying OTP and changing password...
      console.log('Password changed successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', [theme.breakpoints.down('sm')]: { padding: '10px' } }}>
      {step === 1 && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email címed"
          />
          <Button onClick={handleSendOtp}>OTP kérése</Button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Új jelszó"
          />
          <Button onClick={handleResetPassword}>Jelszó módosítása</Button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;

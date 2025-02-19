import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import { useAuth } from '../contexts/AuthContext';

const DeactivateProfile = () => {
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  const handleDeactivate = async () => {
    if (!isLoggedIn) {
      setError('Nincs bejelentkezve a felhasználó.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { error: responseText };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Hiba történt a profil inaktiválása során.');
      }

      setIsDeactivated(true);
    } catch (err) {
      console.error('Hiba:', err.message);
      setError(err.message);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '20px auto', padding: '16px' }}>
      <CardContent style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Profil Inaktiválása</h2>
        {isDeactivated ? (
          <Alert severity="success">A profilod sikeresen inaktiválva lett.</Alert>
        ) : (
          <>
            <p style={{ marginBottom: '16px' }}>Biztosan inaktiválni szeretnéd a profilod?</p>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeactivate}
            >
              Profil Inaktiválása
            </Button>
          </>
        )}
        {error && (
          <Alert severity="error" style={{ marginTop: '16px' }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DeactivateProfile;
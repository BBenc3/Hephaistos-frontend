import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import useUserData from '../hooks/useUserData';
import { useTheme } from '@mui/material/styles';

const DeactivateProfile = () => {
  const theme = useTheme();
  const { isDeactivated, error, handleDeactivate } = useUserData();

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: '20px auto',
        padding: '16px',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          padding: '16px',
        },
      }}
    >
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
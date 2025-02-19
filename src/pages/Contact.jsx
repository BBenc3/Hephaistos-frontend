import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt kezelheted az űrlap beküldését, például egy API hívással.
    console.log({ name, email, message });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Kapcsolat
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        Kérdése van? Kérjük, töltse ki az alábbi űrlapot.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Név"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Üzenet"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Küldés
            </Button>
          </form>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#f5f5f5', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold">
              Hephaistos
            </Typography>
            <Typography variant="body1" gutterBottom>
              Egyéb elérhetőségeink
            </Typography>
            <Typography variant="body2">
              Az alábbi elérhetőségeken fordulhat a Hephaistos munkatársaihoz:
            </Typography>
            <Typography variant="body2">+36 (46) 111-111</Typography>
            <Typography variant="body2">3515 Miskolc, Palóczy László utca 3, 3525</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box sx={{ width: '100%', textAlign: 'center', padding: 2, backgroundColor: 'transparent', marginTop: 4 }}>
        <Typography variant="body2" fontWeight="bold">Üzemeltető és fejlesztő: Hephaistos Kft.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/contact')}>Kapcsolat</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}>Adatkezelési nyilatkozat</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/technical-info')}>Technikai információk</Typography>
          <Typography variant="body2">© 2025 Hephaistos. Minden jog fenntartva</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/faq')}>GYIK</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;

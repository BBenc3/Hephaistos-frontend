import React from 'react';
import { Box, Typography, Card, CardContent, Link, Avatar, Grid, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useUserData from '../hooks/useUserData';

const TestPage = () => {
  const theme = useTheme();
  const { user } = useUserData();
  const userName = user?.username || "Felhasználó"; // Fetch the user's name dynamically

  return (
    <Box sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Szia, {userName}! Örülünk, hogy újra itt vagy!
        </Typography>
        <Avatar src="/path/to/profile.jpg" alt="Profile Picture" sx={{ width: 50, height: 50 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Általános információk
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={4} key={item}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#D3D0CC' }}>
                <CardContent>
                  <Typography variant="subtitle1">Oktatással kapcsolatos információ ({item})</Typography>
                  <Typography variant="body2">Teszt kinézet</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Ez egy leírás a kártyához. Tartalmazhat rövid információkat.
                  </Typography>
                  <Link href="#" underline="hover">
                    Ugrás
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 1, backgroundColor: '#D3D0CC' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Eddig generált órarendek
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField label="Vizsga" variant="outlined" fullWidth size="small" />
              <TextField label="Tantárgy" variant="outlined" fullWidth size="small" />
              <TextField label="Dátum" variant="outlined" fullWidth size="small" />
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Percent</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Replace with dynamic data */}
                {[1, 2, 3].map((row) => (
                  <TableRow key={row}>
                    <TableCell>{row}</TableCell>
                    <TableCell>Exam {row}</TableCell>
                    <TableCell>Subject {row}</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>95%</</TableCell>
                    <TableCell>2025-01-31</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, p: 1, backgroundColor: '#D3D0CC' }}>
            <CardContent>
              <Typography variant="subtitle1">Teszt kinézet</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Ez egy leírás a kártyához. Tartalmazhat rövid információkat.
              </Typography>
              <Link href="#" underline="hover">
                Ugrás
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 1, backgroundColor: '#D3D0CC' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Értesítések
            </Typography>
            {[{ date: '2025. Január 31', text: 'Ez egy értesítés.', color: 'turquoise' }, { date: '2025. Február 1', text: 'Ez egy másik értesítés.', color: 'orange' }].map((notification, index) => (
              <Box key={index} sx={{ mb: 1, p: 1, borderRadius: 2, backgroundColor: notification.color }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {notification.date}
                </Typography>
                <Typography variant="body2">{notification.text}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestPage;

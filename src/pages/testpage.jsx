import React from 'react';
import { Box, Typography, Card, CardContent, Link, Avatar, Grid, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useUserData from '../hooks/useUserData';
import Carousel from 'react-material-ui-carousel';

const TestPage = () => {
  const theme = useTheme();
  const { user } = useUserData();
  const userName = user?.username || "Felhasználó"; // Fetch the user's name dynamically

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      // Morning: 00:00 - 11:59
      return "Jó reggelt";
    } else if (currentHour < 18) {
      // Afternoon: 12:00 - 17:59
      return "Jó napot";
    } else {
      // Evening: 18:00 - 23:59
      return "Jó estét";
    }
  };

  const educationInfo = [
    {
      title: "Oktatással kapcsolatos információ (1)",
      description: "Az oktatási rendszerünk folyamatosan fejlődik, hogy a legjobb tanulási élményt nyújtsa.",
      link: "#"
    },
    {
      title: "Oktatással kapcsolatos információ (2)",
      description: "Új kurzusok és tananyagok érhetők el a platformunkon.",
      link: "#"
    },
    {
      title: "Oktatással kapcsolatos információ (3)",
      description: "Vegyél részt interaktív webináriumainkon és workshopjainkon.",
      link: "#"
    }
  ];

  const appInfo = [
    {
      title: "Karbantartás várható (1)",
      description: "2025. Január 31-én karbantartás várható az alkalmazásban. A karbantartás során az alkalmazás nem lesz elérhető.",
      link: "#"
    },
    {
      title: "Új funkciók (2)",
      description: "Az alkalmazás új funkciókkal bővült, amelyek még kényelmesebbé teszik a használatot.",
      link: "#"
    },
    {
      title: "Felhasználói visszajelzések (3)",
      description: "Köszönjük a visszajelzéseket! Folyamatosan dolgozunk az alkalmazás fejlesztésén.",
      link: "#"
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {getGreeting()}, {userName}! Örülünk, hogy újra itt vagy!
        </Typography>
        <Avatar src="/path/to/profile.jpg" alt="Profile Picture" sx={{ width: 50, height: 50 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Általános információk
        </Typography>
        <Carousel>
          {educationInfo.map((info, index) => (
            <Card key={index} sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">{info.title}</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {info.description}
                </Typography>
                <Link href={info.link} underline="hover">
                  Ugrás
                </Link>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Alkalmazással kapcsolatos információk
        </Typography>
        <Carousel>
          {appInfo.map((info, index) => (
            <Card key={index} sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">{info.title}</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {info.description}
                </Typography>
                <Link href={info.link} underline="hover">
                  Ugrás
                </Link>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ borderRadius: 2, boxShadow: 2, p: 1, backgroundColor: '#FFFFFF' }}>
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
                    <TableCell>95%</TableCell>
                    <TableCell>2025-01-31</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 1, backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="subtitle1">Információ</Typography>
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
          <Paper sx={{ borderRadius: 2, boxShadow: 2, p: 1, backgroundColor: '#FFFFFF' }}>
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

      <Box sx={{ backgroundColor: '#E0E0E0', padding: 2, mt: 2 }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Additional information or footer content can go here.
        </Typography>
      </Box>
    </Box>
  );
};

export default TestPage;

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Link, Avatar, Grid, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useUserData from '../hooks/useUserData';

const TestPage = () => {
  const theme = useTheme();
  const { user } = useUserData();
  const userName = user?.username || "Felhasználó"; // Fetch the user's name dynamically

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' });

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      // reggel: 00:00 - 11:59
      return "Jó reggelt";
    } else if (currentHour < 18) {
      // delutan: 12:00 - 17:59
      return "Jó napot";
    } else {
      // este: 18:00 - 23:59
      return "Jó estét";
    }
  };

  const handleInfoClick = (title, description) => {
    setDialogContent({ title, description });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Oktatással kapcsolatos információ</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Az oktatási rendszerünk folyamatosan fejlődik, hogy a legjobb tanulási élményt nyújtsa.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Oktatással kapcsolatos információ', 'Az oktatási rendszerünk folyamatosan fejlődik, hogy a legjobb tanulási élményt nyújtsa. Részletesebben: Az új tantervek és módszertanok bevezetésével célunk, hogy minden diák számára elérhetővé tegyük a legmodernebb oktatási eszközöket és technikákat. A tanárok folyamatos képzése és a digitális tananyagok fejlesztése is hozzájárul ahhoz, hogy a tanulás élménye még hatékonyabb és élvezetesebb legyen.')}>                  További információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Oktatással kapcsolatos információ </Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Új kurzusok és tananyagok érhetők el a platformunkon.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Oktatással kapcsolatos információ', 'Új kurzusok és tananyagok érhetők el a platformunkon. Részletesebben: Az új kurzusok között megtalálhatók a legújabb technológiai trendekkel kapcsolatos képzések, valamint a klasszikus tudományterületek mélyebb megértését célzó tananyagok is. A tananyagok interaktív elemekkel és gyakorlati példákkal gazdagodtak, hogy a tanulás még élvezetesebb és hatékonyabb legyen.')}>                  További információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Oktatással kapcsolatos információ</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Vegyél részt interaktív webináriumainkon és workshopjainkon.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Oktatással kapcsolatos információ', 'Vegyél részt interaktív webináriumainkon és workshopjainkon. Részletesebben: Az interaktív webináriumok és workshopok lehetőséget biztosítanak arra, hogy közvetlenül kérdezhess szakértőktől, és valós időben kapj választ kérdéseidre. A gyakorlati foglalkozások során pedig kipróbálhatod a tanultakat, és azonnali visszajelzést kaphatsz.')}>                  További információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Alkalmazással kapcsolatos információk
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Karbantartás várható</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  2025. Január 31-én karbantartás várható az alkalmazásban. A karbantartás során az alkalmazás nem lesz elérhető.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Karbantartás várható', '2025. Január 31-én karbantartás várható az alkalmazásban. A karbantartás során az alkalmazás nem lesz elérhető. Részletesebben: A karbantartás célja, hogy javítsuk az alkalmazás teljesítményét és biztonságát. Az új frissítések és javítások bevezetésével biztosítjuk, hogy az alkalmazás zökkenőmentesen működjön, és megfeleljen a legújabb biztonsági előírásoknak.')}>                  További információTovábbi információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Új funkciók</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Az alkalmazás új funkciókkal bővült, amelyek még kényelmesebbé teszik a használatot.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Új funkciók', 'Az alkalmazás új funkciókkal bővült, amelyek még kényelmesebbé teszik a használatot. Részletesebben: Az új funkciók között megtalálhatók a személyre szabható értesítések, a fejlett keresési lehetőségek, valamint a közösségi funkciók, amelyek lehetővé teszik a felhasználók közötti interakciót és együttműködést.')}>                  További információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="subtitle1">Dark Mode Megérkezett</Typography>
                <Typography variant="body2">Információ</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  A Dark Mode megérkezett! Mostantól választhatsz a világos és sötét téma között, hogy a szemedet kímélve használd az alkalmazást.
                </Typography>
                <Link href="#" underline="hover" onClick={() => handleInfoClick('Dark Mode Megérkezett', 'A Dark Mode megérkezett! Mostantól választhatsz a világos és sötét téma között, hogy a szemedet kímélve használd az alkalmazást. Részletesebben: A sötét mód nemcsak esztétikus, hanem segít csökkenteni a szemfáradtságot is, különösen gyenge fényviszonyok mellett. Próbáld ki az új funkciót a beállítások menüben, és válaszd ki a számodra legkényelmesebb megjelenítési módot.')}>                  További információ
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                  <TableCell>Vizsga neve</TableCell>
                  <TableCell>Tantárgy</TableCell>
                  <TableCell>Dátum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Replace with dynamic data */}
                {[1, 2, 3].map((row) => (
                  <TableRow key={row}>
                    <TableCell>{row}</TableCell>
                    <TableCell>Vizsga {row}</TableCell>
                    <TableCell>Tantárgy {row}</TableCell>
                    <TableCell>2025-01-31</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Bezárás
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestPage;

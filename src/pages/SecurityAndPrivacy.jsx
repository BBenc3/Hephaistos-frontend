import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText, Button } from "@mui/material";
import { Home, Lock, Security, Key } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

const SecurityAndPrivacy = () => {
  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);

  const handleChangePasswordDialogOpen = () => setChangePasswordDialogOpen(true);
  const handleChangePasswordDialogClose = () => setChangePasswordDialogOpen(false);

  return (
    <Box display="flex" flexDirection="row" p={3}>
      {/* Sidebar */}
      <Box width={250} bgcolor="#f5f5f5" p={2} borderRadius={2}>
        <Typography variant="h6" mb={2}>Dávid Szegedi</Typography>
        <Typography variant="body2" color="textSecondary">zhyte01@outlook.hu</Typography>
        <List>
          <ListItem button component={Link} to="/profile">
            <Home sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Fiók" sx={{ color: "text.primary" }} />
          </ListItem>
          <ListItem button>
            <Lock sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Az Ön adatai" sx={{ color: "text.primary" }} />
          </ListItem>
          <ListItem button selected>
            <Security sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Biztonság és adatvédelem" sx={{ color: "primary.main" }} />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1} pl={3}>
        <Card sx={{ maxWidth: 1200, width: "100%", mt: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Biztonság és adatvédelem</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" mb={2}>
              Adatvédelem
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Az adatvédelem azzal kezdődik, hogy Ön felügyeli az adatait, és megadja önnek azokat az eszközöket és információkat, amelyek alapján jónak érezheti magát. 
              Ezen a webhelyen kezelheti az Ön által használt Hephaistos-termékek adatvédelmi beállításait, valamint azt, hogy hol tekintheti meg és törölheti a Hephaistos-fiók tevékenységére vonatkozó adatokat.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Jelszó módosítása</Typography>
              <Button
                startIcon={<Key />}
                color="primary"
                onClick={handleChangePasswordDialogOpen}
              >
                Jelszó módosítása
              </Button>
            </Box>
            <Typography variant="body1" color="textSecondary" mb={3}>
              A jelszó módosításával biztosíthatja fiókja védelmét. Javasoljuk, hogy erős, egyedi jelszót használjon, amelyet rendszeresen frissít.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" mb={2}>
              Biztonság
            </Typography>
            <Typography variant="body1" color="textSecondary">
              A biztonsági beállítások segítségével megvédheti fiókját a jogosulatlan hozzáféréstől. Itt kezelheti a kétlépcsős azonosítást és más biztonsági funkciókat.
            </Typography>
          </CardContent>
        </Card>
        <ChangePasswordDialog
          open={isChangePasswordDialogOpen}
          onClose={handleChangePasswordDialogClose}
        />
      </Box>
    </Box>
  );
};

export default SecurityAndPrivacy;

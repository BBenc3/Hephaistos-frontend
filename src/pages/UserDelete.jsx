import React from "react";
import { Box, Typography, Card, CardContent, Button, Alert, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Home, Lock, Security } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useUserData from "../hooks/useUserData";

const UserDelete = () => {
  const theme = useTheme();
  const { isDeactivated, error, handleDeactivate, handleDelete } = useUserData();

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
          <ListItem button component={Link} to="/security-and-privacy">
            <Security sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Biztonság és adatvédelem" sx={{ color: "text.primary" }} />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1} pl={3}>
        <Card sx={{ maxWidth: 800, width: "100%", margin: "0 auto", mt: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Profil Inaktiválása vagy Törlése
            </Typography>
            <Divider sx={{ my: 2 }} />
            {isDeactivated ? (
              <Alert severity="success">A profilod sikeresen inaktiválva lett.</Alert>
            ) : (
              <>
                <Typography variant="body1" color="textSecondary" mb={3}>
                  Válasszon az alábbi lehetőségek közül:
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeactivate}
                  >
                    Profil Inaktiválása
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                  >
                    Profil végleges törlése
                  </Button>
                </Box>
              </>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserDelete;
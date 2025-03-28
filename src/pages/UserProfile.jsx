import React, { useState } from "react";
import { Avatar, Box, Button, Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Home, Lock, Security } from "@mui/icons-material";
import EditProfileDialog from "../components/EditProfileDialog";
import EditAccountDialog from "../components/EditAccountDialog";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext

const ProfilePage = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const [isEditProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const [isEditAccountDialogOpen, setEditAccountDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditProfileDialogOpen = () => setEditProfileDialogOpen(true);
  const handleEditProfileDialogClose = () => setEditProfileDialogOpen(false);

  const handleEditAccountDialogOpen = () => setEditAccountDialogOpen(true);

  const handleNavigateToUserDelete = () => {
    navigate("/userdelete");
  };

  return (
    <Box display="flex" flexDirection="row" p={3}>
      {/* Sidebar */}
      <Box width={250} bgcolor="#f5f5f5" p={2} borderRadius={2}>
        <Typography variant="h6" mb={2}>{currentUser?.name || "Felhasználó"}</Typography>
        <Typography variant="body2" color="textSecondary">{currentUser?.email || "Nincs e-mail"}</Typography>
        <List>
          <ListItem button>
            <Home sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Fiók" sx={{ color: "text.primary" }} />
          </ListItem>
          <ListItem button selected>
            <Lock sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Az Ön adatai" sx={{ color: "primary.main" }} />
          </ListItem>
          <ListItem button component={Link} to="/security-and-privacy">
            <Security sx={{ mr: 2, color: "inherit" }} /> 
            <ListItemText primary="Biztonság és adatvédelem" sx={{ color: "text.primary" }} />
          </ListItem>
        </List>
      </Box>
      
      {/* Profile Content */}
      <Box flex={1} pl={3}>
        <Typography variant="h5" mb={2}>Az Ön adatai</Typography>

        <Card sx={{ maxWidth: 1200, width: "100%", mt: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 180, height: 180, mr: 3 }} />
              <Box>
                <Typography variant="h6">{currentUser?.name || "Felhasználó"}</Typography> {/* Display user's name */}
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Tegye személyesebbé profilját egy fénykép hozzáadásával.
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>Fénykép hozzáadása</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 1200, width: "100%", mt: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Profiladatok</Typography>
              <Typography
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={handleEditProfileDialogOpen}
              >
                Profiladatok szerkesztése
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography mt={1}><strong>Születési idő:</strong> 2001. 11. 09.</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography><strong>Ország vagy régió:</strong> Magyarország</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography><strong>Nyelv:</strong> magyar (Magyarország)</Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 1200, width: "100%", mt: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Fiókadatok</Typography>
              <Typography
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={handleEditAccountDialogOpen}
              >
                Fiókadatok szerkesztése
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography mt={1}><strong>E-mail cím:</strong> {currentUser?.email || "Nincs e-mail"}</Typography> {/* Display user's email */}
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="textSecondary" mt={1}>
              A Hephaistos-fiókjába való bejelentkezéshez használt e-mail-cím
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography mt={2}><strong>Kommunikációs beállítások</strong></Typography>
            <Divider sx={{ my: 1 }} />
            <Typography><strong>Telefonszám:</strong> Nincs</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              mt={2}
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={handleNavigateToUserDelete}
            >
              Fiók megszüntetése vagy inaktiválása
            </Typography>
          </CardContent>
        </Card>

        <EditProfileDialog open={isEditProfileDialogOpen} onClose={handleEditProfileDialogClose} />
        <EditAccountDialog open={isEditAccountDialogOpen} onClose={() => setEditAccountDialogOpen(false)} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
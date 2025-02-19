import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Button,
  Grid, // Import Grid
  useMediaQuery, // Import useMediaQuery
  useTheme, // Import useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check screen size

  useEffect(() => {
    if (!user) {
      axios
        .get("https://localhost:5001/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Hiba történt a felhasználói adatok lekérése közben."); // Set error message
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  const handleDeactivate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete("https://localhost:5001/api/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error deactivating profile:", err);
      setError("Hiba történt a profil inaktiválása során."); // Set error message
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}> {/* Centered loading */}
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}> {/* Centered message */}
        <Typography variant="h6">Felhasználó nem található vagy nincs hitelesítve</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: theme.spacing(4), marginTop: theme.spacing(4), [theme.breakpoints.down("sm")]: { padding: theme.spacing(2), marginTop: theme.spacing(2) } }}> {/* Responsive padding and margin */}
      <Typography variant="h5" gutterBottom>
        Felhasználói profil
      </Typography>
      <Grid container spacing={2}> {/* Use Grid for layout */}
        <Grid item xs={12} sm={6}> {/* Responsive Grid items */}
          <Typography>
            <strong>Felhasználónév:</strong> {user.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}> {/* Responsive Grid items */}
          <Typography>
            <strong>Létrehozva:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
          <Typography>
            <strong>Szerep:</strong> {user.role}
          </Typography>
          <Typography>
            <strong>Aktív:</strong> {user.active ? "Igen" : "Nem"}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: theme.spacing(3), [theme.breakpoints.down("sm")]: { flexDirection: "column", alignItems: "flex-start" } }}> {/* Responsive button layout */}
        <Button
          variant="text"
          onClick={() => navigate("/editprofile")}
          sx={{ fontSize: "0.8rem", [theme.breakpoints.down("sm")]: { marginBottom: theme.spacing(2) } }} // Responsive font size and margin
        >
          Módosítás
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeactivate}
        >
          Profil Inaktiválása
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ marginTop: theme.spacing(2) }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default UserProfile;
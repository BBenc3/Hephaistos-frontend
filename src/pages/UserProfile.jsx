import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Csak akkor hívjuk meg az API-t, ha a user nincs betöltve
      axios
        .get("https://localhost:5001/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you store the JWT token in localStorage
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Ha a user már betöltött, nincs szükség újratöltésre
    }
  }, [user, setUser]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography variant="h6">User not found or not authenticated</Typography>;
  }

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h5">User Profile</Typography>
      <Box mt={2}>
        <Typography>
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>
          <strong>Role:</strong> {user.role}
        </Typography>
        <Typography>
          <strong>Active:</strong> {user.active ? "Yes" : "No"}
        </Typography>
      </Box>
      <Button
        variant="text"
        sx={{ fontSize: "0.7rem" }}
        onClick={() => navigate("/editprofile")}
      >
        Módosítás
      </Button>
    </Paper>
  );
};

export default UserProfile;

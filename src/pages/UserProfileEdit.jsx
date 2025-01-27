import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";


const UserProfileEdit = () => {
  const { user, setUser } = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState({});

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
          console.error("There was an error fetching the user data!", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  const handleEditClick = () => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    axios
      .put(
        "https://localhost:5001/api/users/me",
        editUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setUser(response.data);
        setEditDialogOpen(false);
      })
      .catch((error) => {
        console.error("There was an error updating the user data!", error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography variant="h6">User not found or not authenticated</Typography>;
  }

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h5">User Profile Edit</Typography>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          style={{ marginTop: "20px" }}
        >
          Edit Profile
        </Button>
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={editUser.username || ""}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={editUser.email || ""}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserProfileEdit;

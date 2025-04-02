import React, { useEffect, useState } from "react";
import { Container, Typography, Avatar, Grid, List, ListItem, ListItemText, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import Notification from "../components/Notification";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext to check login status

const ProfilePage = () => {
    const { user, loading, errorNotification, handleDeactivate } = useUserData();
    const { isLoggedIn } = useAuth(); // Assuming you have an AuthContext to check login status
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ open: false, message: "", severity: "error" });

    const handleNotificationClose = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    useEffect(() => {
        // Ensure redirect happens only after loading is done and user is not logged in
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [user, isLoggedIn, loading, navigate]);

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (errorNotification) {
        return errorNotification;
    }

    const profileBaseUrl = process.env.REACT_APP_PROFILE_PICTURE_BASE_URL; // Get the base URL from .env
    const displayAvatar = user?.profilePicturePath
        ? `${profileBaseUrl}ProfilePictures/${user?.profilePicturePath}`
        : "https://via.placeholder.com/150"; // Construct the full URL

    // Ensure `completedSubjects` is an array before calling `map()`
    const completedSubjects = Array.isArray(user?.completedSubjects)
        ? user.completedSubjects.map((subject) => subject.Name).join(", ")
        : "Nincs befejezett tantárgy.";

    return (
        <Container>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item>
                    <Avatar src={displayAvatar} alt={user?.username} sx={{ width: 150, height: 150 }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4">{user?.username}</Typography>
                    <Typography variant="subtitle1">{user?.email}</Typography>
                </Grid>
                <Grid item>
                    <List>
                        <ListItem>
                            <ListItemText primary="Start Year" secondary={user?.startYear} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Major" secondary={user?.majorName} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="University" secondary={user?.university} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Completed Subjects" secondary={completedSubjects} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleDeactivate}>
                        Deactivate Profile
                    </Button>
                </Grid>
            </Grid>

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleNotificationClose}
            />
        </Container>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { Container, Typography, Avatar, Grid, List, ListItem, ListItemText, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, TextField, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import Notification from "../components/Notification";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const ProfilePage = () => {
    const { user, loading, errorNotification, handleDeactivate, fetchAvailableSubjects, updateCompletedSubjects } = useUserData();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ open: false, message: "", severity: "error" });
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [savedPictures, setSavedPictures] = useState([]); // List of filenames from FTP
    const [showSavedPictures, setShowSavedPictures] = useState(false);

    const handleNotificationClose = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [user, isLoggedIn, loading, navigate]);

    useEffect(() => {
        if (user) {
            fetchAvailableSubjects().then((data) => {
                setAvailableSubjects(Array.isArray(data) ? data : []);
                if (user.completedSubjects && Array.isArray(user.completedSubjects)) {
                    setSelectedSubjects(user.completedSubjects.map((subj) => subj.SubjectId));
                } else {
                    setSelectedSubjects([]);
                }
            });
        }
    }, [user, fetchAvailableSubjects]);

    const handleSubjectChange = (event) => {
        setSelectedSubjects(event.target.value);
    };

    const handleUpdateSubjects = async () => {
        try {
            await updateCompletedSubjects(selectedSubjects);
            setNotification({ open: true, message: "Completed subjects updated.", severity: "success" });
        } catch (error) {
            setNotification({ open: true, message: "Error updating subjects.", severity: "error" });
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadPicture = async () => {
        if (!selectedFile) return;
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/user/uploadProfilePicture`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );
            setNotification({ open: true, message: "Profile picture updated.", severity: "success" });
        } catch (err) {
            console.error("Error uploading profile picture:", err);
            setNotification({ open: true, message: "Error uploading profile picture.", severity: "error" });
        }
    };

    const handleLoadSavedPictures = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ftp/list-all`);
            setSavedPictures(response.data);
            setShowSavedPictures(true);
        } catch (err) {
            console.error("Error loading saved pictures:", err);
            setNotification({ open: true, message: "Error loading saved pictures.", severity: "error" });
        }
    };

    const handleSelectSavedPicture = async (pictureName) => {
        const token = localStorage.getItem("accessToken");
        try {
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/user/changeProfilePicture`,
                { profilePicturePath: pictureName },
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            setNotification({ open: true, message: "Profile picture updated.", severity: "success" });
        } catch (err) {
            console.error("Error updating profile picture:", err);
            setNotification({ open: true, message: "Error updating profile picture.", severity: "error" });
        }
    };

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

    const profileBaseUrl = process.env.REACT_APP_PROFILE_PICTURE_BASE_URL;
    const displayAvatar = user?.profilePicturePath
        ? `${profileBaseUrl}ProfilePictures/${user?.profilePicturePath}`
        : "https://via.placeholder.com/150";

    const completedSubjectsText = Array.isArray(user?.completedSubjects) && user.completedSubjects.length > 0
        ? user.completedSubjects.map((subject) => subject.Name).join(", ")
        : "Nincs befejezett tantárgy.";

    return (
        <Container sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar
                    src={displayAvatar}
                    alt={user?.username}
                    sx={{ width: { xs: 100, sm: 150 }, height: { xs: 100, sm: 150 }, mb: 2 }}
                />
                <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
                    {user?.username}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    {user?.email}
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
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
                            <ListItemText primary="Completed Subjects" secondary={completedSubjectsText} />
                        </ListItem>
                    </List>
                </Grid>
                {/* New section for available subjects */}
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h6">Elérhető tárgyak</Typography>
                    {availableSubjects && availableSubjects.length > 0 ? (
                        <List>
                            {availableSubjects.map((subj) => (
                                <ListItem key={subj.Id}>
                                    <ListItemText primary={`${subj.Name} – ${subj.MajorName} / ${subj.UniversityName}`} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2">Nincsenek elérhető tárgyak.</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="completed-subjects-label">Completed Subjects</InputLabel>
                        <Select
                            labelId="completed-subjects-label"
                            multiple
                            value={Array.isArray(selectedSubjects) ? selectedSubjects : []}
                            label="Completed Subjects"
                            onChange={handleSubjectChange}
                        >
                            {(Array.isArray(availableSubjects) ? availableSubjects : []).map((subj) => (
                                <MenuItem key={subj.Id} value={subj.Id}>
                                    {subj.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={handleUpdateSubjects}>
                            Update Completed Subjects
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            sx={{ maxWidth: { sm: '60%' } }}
                        />
                        <Button variant="contained" onClick={handleUploadPicture}>
                            Upload Profile Picture
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleDeactivate}>
                        Deactivate Profile
                    </Button>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <Button variant="outlined" fullWidth onClick={handleLoadSavedPictures}>
                        Select Saved Profile Picture
                    </Button>
                </Grid>
                {showSavedPictures && savedPictures.length > 0 && (
                    <Grid item xs={12} sm={8} md={6}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 2 }}>
                            {savedPictures.map((pic) => {
                                const picUrl = `${process.env.REACT_APP_PROFILE_PICTURE_BASE_URL}ProfilePictures/${pic}`;
                                return (
                                    <Box
                                        key={pic}
                                        component="img"
                                        src={picUrl}
                                        alt={pic}
                                        sx={{ width: 70, height: 70, cursor: 'pointer', borderRadius: 1, border: '1px solid #ccc' }}
                                        onClick={() => handleSelectSavedPicture(pic)}
                                    />
                                );
                            })}
                        </Box>
                    </Grid>
                )}
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

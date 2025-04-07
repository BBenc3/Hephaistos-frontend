import React, { useState } from 'react';
import {
    Box, Typography, Card, Grid, useTheme, TextField, Button
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import useUserData from '../hooks/useUserData';

const ProfilePage = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const { user, loading, error, updateUserData, handleDeactivate } = useUserData();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updating, setUpdating] = useState(false);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    if (!isLoggedIn) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Please log in to view your profile.</Typography>
            </Box>
        );
    }

    // Add this check before rendering user fields
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Loading user data...</Typography>
            </Box>
        );
    }

    // Profilkép URL összeállítása
    const profilePictureUrl = user?.profilePicturePath
        ? process.env.REACT_APP_PROFILE_PICTURE_BASE_URL + "ProfilePictures/" + user.profilePicturePath
        : null;

    // Szerkesztési módba lépés: minden mezőt előtöltünk; mivel a GET válaszban csak majorName érhető el,
    // a MajorId értékét manuálisan kell megadni, ezért üresen hagyjuk.
    const handleEdit = () => {
        setEditData({
            username: user?.username,
            Email: user?.email,
            StartYear: user?.startYear,
            University: user?.university, // new field for University
            Role: user?.Role || "",
            Note: user?.Note || "",
            Active: user?.Active !== undefined ? user.Active : false,
            Status: user?.Status || "",
            MajorId: "", // Itt kell majd a megfelelő major id-t megadni
        });
        setIsEditing(true);
    };

    // Input mezők változásának kezelése
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    // Frissítés mentése (axios hívás a useUserData-ban)
    const handleSave = async () => {
        setUpdating(true);
        setUpdateError(null);
        const success = await updateUserData(editData);
        if (success) {
            setIsEditing(false);
        } else {
            setUpdateError("Hiba történt az adatok frissítése során.");
        }
        setUpdating(false);
    };

    // Szerkesztés megszakítása
    const handleCancel = () => {
        setIsEditing(false);
        setEditData(null);
        setUpdateError(null);
    };

    return (
        <Box sx={{ p: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>
                            {/* Profilkép */}
                            {profilePictureUrl && (
                                <Box sx={{ flexShrink: 0, mr: 3 }}>
                                    <Box
                                        component="img"
                                        src={profilePictureUrl}
                                        alt={`${user?.username || ""} Profile Picture`}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: `3px solid ${theme.palette.primary.main}`,
                                            boxShadow: 2,
                                        }}
                                    />
                                </Box>
                            )}
                            {/* Felhasználói adatok (szerkesztési mód vs. statikus mód) */}
                            <Box sx={{ flex: 1 }}>
                                {isEditing ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Felhasználónév"
                                            name="username"
                                            value={editData.username}
                                            onChange={handleChange}
                                            margin="dense"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="Email"
                                            value={editData.Email}
                                            onChange={handleChange}
                                            margin="dense"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Kezdés éve"
                                            name="StartYear"
                                            value={editData.StartYear}
                                            onChange={handleChange}
                                            margin="dense"
                                        />
                                        <TextField
                                            fullWidth
                                            label="University"
                                            name="University"
                                            value={editData.University}
                                            onChange={handleChange}
                                            margin="dense"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Major ID"
                                            name="MajorId"
                                            value={editData.MajorId}
                                            onChange={handleChange}
                                            margin="dense"
                                        />
                                        {updateError && (
                                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                                {updateError}
                                            </Typography>
                                        )}
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Button variant="contained" color="primary" onClick={handleSave} disabled={updating}>
                                                Mentés
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={updating}>
                                                Mégse
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h4" gutterBottom>
                                            {user?.username}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" gutterBottom>
                                            {user?.email}
                                        </Typography>
                                        <Box sx={{ my: 1 }}>
                                            <Typography variant="subtitle1">
                                                <strong>Kezdés éve:</strong> {user?.startYear}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                <strong>Major:</strong> {user?.majorName || "N/A"}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                <strong>University:</strong> {user?.university}
                                            </Typography>
                                        </Box>
                                        {user?.completedSubjects && user.completedSubjects.$values?.length > 0 ? (
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="h6">Elvégzett tantárgyak:</Typography>
                                                {user.completedSubjects.$values.map((subject) => (
                                                    <Typography variant="body2" key={subject.subjectId}>
                                                        - {subject.name}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="h6">Elvégzett tantárgyak:</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Nincs megjeleníthető tantárgy.
                                                </Typography>
                                            </Box>
                                        )}
                                        <Box sx={{ mt: 2 }}>
                                            <Button variant="contained" onClick={handleEdit}>
                                                Módosítás
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;

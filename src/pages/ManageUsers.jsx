import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import useUserData from "../hooks/useUserData";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserData();
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/User/admin/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const usersData = response.data.$values ? response.data.$values : response.data;
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (userData) => {
        setSelectedUser(userData);
        setOpenEditDialog(true);
    };

    const handleDialogChange = (field, value) => {
        setSelectedUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDialogSave = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/User/admin/${selectedUser.id}`,
                {
                    username: selectedUser.username,
                    email: selectedUser.email,
                    role: selectedUser.role,
                    note: selectedUser.note,
                    status: selectedUser.status,
                    startYear: selectedUser.startYear,
                    active: selectedUser.active,
                    majorId: selectedUser.majorId
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOpenEditDialog(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) return <Typography>Betöltés...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Felhasználók kezelése</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Felhasználónév</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Bejegyzés Év</TableCell>
                        <TableCell>Szerep</TableCell>
                        <TableCell>Műveletek</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(u => (
                        <TableRow key={u.id}>
                            <TableCell>{u.id}</TableCell>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.startYear}</TableCell>
                            <TableCell>{u.role}</TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => handleEdit(u)}>Szerkesztés</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedUser && (
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>
                    <DialogTitle>Felhasználó szerkesztése</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Felhasználónév"
                            value={selectedUser.username || ""}
                            onChange={(e) => handleDialogChange("username", e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            value={selectedUser.email || ""}
                            onChange={(e) => handleDialogChange("email", e.target.value)}
                        />
                        <TextField
                            select
                            fullWidth
                            margin="normal"
                            label="Szerep"
                            value={selectedUser.role || ""}
                            onChange={(e) => handleDialogChange("role", e.target.value)}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Megjegyzés"
                            value={selectedUser.note || ""}
                            onChange={(e) => handleDialogChange("note", e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Bejegyzés Év"
                            type="number"
                            value={selectedUser.startYear || ""}
                            onChange={(e) => handleDialogChange("startYear", parseInt(e.target.value, 10))}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Státusz"
                            value={selectedUser.status || ""}
                            onChange={(e) => handleDialogChange("status", e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedUser.active || false}
                                    onChange={(e) => handleDialogChange("active", e.target.checked)}
                                />
                            }
                            label="Aktív"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="MajorId"
                            type="number"
                            value={selectedUser.majorId || ""}
                            onChange={(e) => handleDialogChange("majorId", parseInt(e.target.value, 10))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleDialogSave}>Mentés</Button>
                        <Button onClick={() => setOpenEditDialog(false)}>Mégse</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default ManageUsers;

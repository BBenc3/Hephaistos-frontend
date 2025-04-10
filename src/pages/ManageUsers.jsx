import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Checkbox,
    FormControlLabel,
    MenuItem,
    InputLabel,
    FormControl,
    Select
} from '@mui/material';
import useUserData from "../hooks/useUserData";
import { useUniversities } from "../hooks/useUniversities";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserData();
    const { universities } = useUniversities();
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedUniversityId, setSelectedUniversityId] = useState("");
    const [availableMajors, setAvailableMajors] = useState([]);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (userData) => {
        setSelectedUser(userData);
        let uniId = "";
        if (userData.majorId && universities.length > 0) {
            const foundUni = universities.find(u => u.majors && u.majors.some(m => m.id === userData.majorId));
            if (foundUni) {
                uniId = foundUni.id;
            }
        }
        setSelectedUniversityId(uniId);
        const majors = universities.find(u => u.id === uniId)?.majors || [];
        setAvailableMajors(majors);
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

            const payload = {
                username: selectedUser.username || "",
                email: selectedUser.email || "",
                role: selectedUser.role || "User",
                note: selectedUser.note || "",
                status: selectedUser.status || "Active",
                startYear: selectedUser.startYear || new Date().getFullYear(),
                active: selectedUser.active !== undefined ? selectedUser.active : true,
                majorId: selectedUser.majorId || null
            };

            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/User/admin/${selectedUser.id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setOpenEditDialog(false);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?");
        if (!confirmDelete) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/User/admin/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
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
                        <TableCell>Törlés</TableCell>
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
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => handleDelete(u.id)}>Törlés</Button>
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Egyetem</InputLabel>
                            <Select
                                value={selectedUniversityId}
                                label="Egyetem"
                                onChange={(e) => {
                                    const uniId = e.target.value;
                                    setSelectedUniversityId(uniId);
                                    const majors = universities.find(u => u.id === uniId)?.majors || [];
                                    setAvailableMajors(majors);
                                    handleDialogChange("majorId", null);
                                }}
                            >
                                {universities.map((uni) => (
                                    <MenuItem key={uni.id} value={uni.id}>
                                        {uni.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Szak</InputLabel>
                            <Select
                                value={selectedUser.majorId || ""}
                                label="Szak"
                                onChange={(e) => {
                                    handleDialogChange("majorId", parseInt(e.target.value, 10));
                                }}
                            >
                                {availableMajors.map((major) => (
                                    <MenuItem key={major.id} value={major.id}>
                                        {major.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

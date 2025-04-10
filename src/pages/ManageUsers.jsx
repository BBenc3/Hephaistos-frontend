import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel } from '@mui/material';
import useUserData from "../hooks/useUserData";
import MenuItem from '@mui/material/MenuItem';

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
                    rname, // included username if needed by the endpoint
                    username: selectedUser.username, l,
                    email: selectedUser.email,
                    role: selectedUser.role,
                    note: selectedUser.note,
                    status: selectedUser.status, tYear,
                    startYear: selectedUser.startYear,
                    active: selectedUser.active, majorId: selectedUser.majorId
                    majorId: selectedUser.majorId
                }, { headers: { Authorization: `Bearer ${token}` } }
                { headers: { Authorization: `Bearer ${token}` } }
            ); alog(false);
            setOpenEditDialog(false);
        } catch (error) {
            console.error("Error updating user:", error);
            console.error("Error updating user:", error);
        }
    }
};
    };
if (loading) return <Typography>Betöltés...</Typography>;
if (loading) return <Typography>Betöltés...</Typography>;

return (
        <Container>aphy variant="h4" gutterBottom>Felhasználók kezelése</Typography>
            <Typography variant="h4" gutterBottom>Felhasználók kezelése</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>ableCell>
                        <TableCell>Felhasználónév</TableCell>
                        <TableCell>Email</TableCell>eCell>
                        <TableCell>Bejegyzés Év</TableCell>
                        <TableCell>Szerep</TableCell>ell>Műveletek</TableCell>
                        <TableCell>Műveletek</TableCell>ow>
                    </TableRow>>
                </TableHead>
                <TableBody>
                    {users.map(u => (
                        <TableRow key={u.id}>
                            <TableCell>{u.id}</TableCell>ll>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.email}</TableCell>Cell>
                            <TableCell>{u.startYear}</TableCell>{u.role}</TableCell>
                            <TableCell>{u.role}</TableCell>
                            <TableCell>variant="outlined" onClick={() => handleEdit(u)}>Szerkesztés</Button>
                                <Button variant="outlined" onClick={() => handleEdit(u)}>Szerkesztés</Button>Cell>
                            </TableCell> </TableRow >
                        </TableRow >
                    ))}bleBody >
                </TableBody >            </Table >
            </Table >

    { selectedUser && (tDialog(false)} fullWidth >
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>lhasználó szerkesztése</DialogTitle>
                    <DialogTitle>Felhasználó szerkesztése</DialogTitle> >
                    <DialogContent>
                        <TextField
                            fullWidthl"
                            margin="normal"
                            label="Felhasználónév"
                            value={selectedUser.username || ""}  onChange={(e) => handleDialogChange("email", e.target.value)}
                            onChange={(e) => handleDialogChange("username", e.target.value)}
                        />
                        <TextField
                            fullWidth"
                            margin="normal"
                            label="Email"
                            value={selectedUser.email || ""}  onChange={(e) => handleDialogChange("role", e.target.value)}
                            onChange={(e) => handleDialogChange("email", e.target.value)}
                        />
                        <TextField
                            select
                            fullWidth
                            margin="normal"
                            label="Szerep"  onChange={(e) => handleDialogChange("note", e.target.value)}
                            value={selectedUser.role || ""}
                            onChange={(e) => handleDialogChange("role", e.target.value)}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </TextField>
                        <TextField  onChange={(e) => handleDialogChange("status", e.target.value)}
                            fullWidth
                            margin="normal"
                            label="Megjegyzés"
                            value={selectedUser.note || ""}
                            onChange={(e) => handleDialogChange("note", e.target.value)}zés Év"
                        />
                        <TextField
                            fullWidth  onChange={(e) => handleDialogChange("startYear", parseInt(e.target.value, 10))}
                            margin="normal"
                            label="Státusz"abel
                            value={selectedUser.status || ""}
                            onChange={(e) => handleDialogChange("status", e.target.value)}
                        />
                        <TextField  onChange={(e) => handleDialogChange("active", e.target.checked)}
                            fullWidth   />
                            margin="normal"
                            label="Bejegyzés Év"  label="Aktív"
                            type="number"
                            value={selectedUser.startYear || ""}
                            onChange={(e) => handleDialogChange("startYear", parseInt(e.target.value, 10))}
                        />
                        <FormControlLabeld"
                            control={
                                <Checkbox
                                    checked={selectedUser.active || false}  onChange={(e) => handleDialogChange("majorId", e.target.value ? parseInt(e.target.value, 10) : null)}
                                    onChange={(e) => handleDialogChange("active", e.target.checked)}
                                />>
                            }
                            label="Aktív"
                        />ant="contained" onClick={handleDialogSave}>Mentés</Button>
                        <TextFieldlogActions>
                            fullWidth  </Dialog>
margin = "normal"
label = "MajorId"  </Container >
    type="number"  );
value = { selectedUser.majorId || "" }};
onChange = {(e) => handleDialogChange("majorId", e.target.value ? parseInt(e.target.value, 10) : null)}
                        />export default ManageUsers;













export default ManageUsers;};    );        </Container >            )}                </Dialog >                    </DialogActions >                        <Button variant="contained" onClick={handleDialogSave}>Mentés</Button>                        <Button onClick={() => setOpenEditDialog(false)}>Mégse</Button>                    <DialogActions>                    </DialogContent>
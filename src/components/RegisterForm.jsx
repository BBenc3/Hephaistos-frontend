import React, { useState } from 'react';
import { TextField, Button, Box, Grid, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = ({ setNotification }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        startYear: '',
        majorId: 1,
        status: 'Active',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the registration data to the API
        console.log('Registering with data:', formData);
        // If registration is successful:
        setNotification({ open: true, message: 'Registration successful!', severity: 'success' });
        // On error, set notification with appropriate message
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={handlePasswordToggle} size="small">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Start Year"
                variant="outlined"
                type="number"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
            />
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RegisterForm;

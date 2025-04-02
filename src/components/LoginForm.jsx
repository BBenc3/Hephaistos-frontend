import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Az AuthContext importálása

const LoginForm = ({ setNotification }) => {
    const theme = useTheme();
    const { login, isLoggedIn, error } = useAuth(); // Az AuthContext használata
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
        stayLoggedIn: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ usernameOrEmail: formData.usernameOrEmail, password: formData.password });
            setNotification({ open: true, message: 'Login successful!', severity: 'success' });
        } catch (err) {
            setNotification({ open: true, message: error, severity: 'error' });
        }
    };

    // Ha már be van jelentkezve, átirányítjuk a profil oldalra
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

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
                label="Username or Email"
                variant="outlined"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
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
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;

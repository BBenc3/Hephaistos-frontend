import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Register from './pages/auth/Register';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/UserProfile';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { colors, darkColors } from './Theme/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { useDarkMode } from './hooks/useDarkMode';
import About from './pages/About'; // Add this line
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const theme = createTheme({
    palette: {
      primary: { main: isDarkMode ? darkColors.primary : colors.primary },
      secondary: { main: isDarkMode ? darkColors.secondary : colors.secondary },
      background: { default: isDarkMode ? darkColors.background : colors.background },
      text: { primary: isDarkMode ? darkColors.text : colors.text },
      error: { main: isDarkMode ? darkColors.error : colors.error },
      warning: { main: isDarkMode ? darkColors.warning : colors.warning },
      info: { main: isDarkMode ? darkColors.info : colors.info },
      success: { main: isDarkMode ? darkColors.success : colors.success },
    },
  });

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userdelete" element={<ProtectedRoute element={<UserDelete />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/edit" element={<ProtectedRoute element={<UserEdit />} />} />
            <Route path="/about" element={<About />} /> {/* Add this line */}
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
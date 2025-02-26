import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors, darkColors } from './styles/colors';
import { useDarkMode } from './hooks/useDarkMode';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Profile from './pages/UserProfile';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';
import Login from './pages/auth/Login';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/auth/Register/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { useMediaQuery } from '@mui/material';

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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Home isMobile={isMobile} />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userdelete" element={<ProtectedRoute element={<UserDelete />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/edit" element={<ProtectedRoute element={<UserEdit />} />} />
            <Route path="/about" element={<About />} /> {/* Add this line */}
            <Route path="*" element={<ErrorPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
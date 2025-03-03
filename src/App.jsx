import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors, darkColors } from './styles/colors';
import { useDarkMode } from './hooks/useDarkMode';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Profile from './pages/UserProfile';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';
import Login from './pages/auth/Login';
import ErrorPage from './components/Error/ErrorPage';
import Register from './pages/auth/Register/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { useMediaQuery } from '@mui/material';
import Notification from './components/Notification';

function App() {
  // Wrap the inner app in AuthProvider
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Child component that uses useAuth
function AppContent() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const { refreshTokens } = useAuth();
  const [notification, setNotification] = React.useState({ open: false, message: '' });
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
    const savedRefreshToken = localStorage.getItem('refreshToken');
    if (!savedRefreshToken) {
      setNotification({ open: true, message: 'A munkamenet lejárt' });
    } else {
      refreshTokens((msg) => setNotification({ open: true, message: msg }));
    }
  }, [isDarkMode, refreshTokens]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      {notification.open && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity="warning"
          onClose={() => setNotification({ open: false, message: '' })}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
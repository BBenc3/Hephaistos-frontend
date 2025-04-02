import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useDarkMode } from "./hooks/useDarkMode";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import ErrorPage from "./pages/Error/ErrorPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { useMediaQuery } from "@mui/material";
import Notification from "./components/Notification";
import generateTheme from "./styles/theme"; // Importáljuk a theme.js-t
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useDarkMode(); // Téma mód állapot
  const [notification, setNotification] = React.useState({ open: false, message: "" });

  const theme = generateTheme(isDarkMode ? "dark" : "light"); // Téma generálása

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode"; // Frissítjük a body class-t
  }, [isDarkMode]);

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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      {notification.open && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity="warning"
          onClose={() => setNotification({ open: false, message: "" })}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

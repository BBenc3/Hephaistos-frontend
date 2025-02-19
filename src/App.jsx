import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/UserProfile';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userdelete" element={<ProtectedRoute element={<UserDelete />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/edit" element={<ProtectedRoute element={<UserEdit />} />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
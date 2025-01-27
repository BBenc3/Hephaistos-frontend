import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import UserProfileEdit from './pages/UserProfileEdit';
import Profile from './pages/UserProfile';
import { UserProvider } from './contexts/UserContext';

function App() {

  return (
    <AuthProvider>
      <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
          <Route path="/editprofile" element={<UserProfileEdit />} />
        </Routes>
      </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

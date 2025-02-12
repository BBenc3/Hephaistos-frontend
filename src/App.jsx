import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/UserProfile';
import { UserProvider } from './contexts/UserContext';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';

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
          <Route path="/userdelete" element={<UserDelete />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
          <Route path="/edit" element={<UserEdit />} /> {/* Módosító oldal */}
        </Routes>
      </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

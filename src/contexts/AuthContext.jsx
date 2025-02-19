import React, { createContext, useState, useEffect, useContext } from 'react';


// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide the context to the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if accessToken is in localStorage
    const token = sessionStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // Set logged in state based on the presence of accessToken
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken'); // Remove accessToken from sessionStorage on logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

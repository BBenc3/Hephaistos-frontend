// src/contexts/UserContext.jsx
import React, { createContext, useState, useContext } from "react";

// A context létrehozása
const UserContext = createContext();

// Egy provider komponens
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Egyedi hook a könnyebb hozzáféréshez
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

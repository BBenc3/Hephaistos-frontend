import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    try {
      // Get access token
      const response = await axios.post('https://localhost:5001/auth/login', credentials);
      const accessToken = response.data.accessToken;
      sessionStorage.setItem('accessToken', accessToken);
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/;`;

      // Fetch user data using access token
      const userResponse = await axios.get('https://localhost:5001/api/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = userResponse.data;

      // Set user data in context
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      console.log('User logged in:', user); // Log the user state
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      console.error('Login error:', error); // Log the error
    }
  };

  const logout = () => {
    // Kijelentkezési logika
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

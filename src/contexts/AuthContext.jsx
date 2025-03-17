import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';

//hiányzik a refreshtoken logika
const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      }
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    try {
      const response = await axios.post('https://localhost:5001/api/auth/login', credentials ,{
          headers: {
            'Content-Type': 'application/json',
          }
        });
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };

  const requestOtp = async (email) => {
    try {
      await axios.post('https://localhost:5001/api/auth/generate-otp', { email });
    } catch (error) {
      console.error('OTP request error:', error);
    }
  };

  const verifyOtp = async (email, otp, newPassword) => {
    try {
      await axios.put('https://localhost:5001/api/auth/change-password-after-otp', { email, otp, newPassword });
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, requestOtp, verifyOtp}}>
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

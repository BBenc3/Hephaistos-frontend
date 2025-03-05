import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
      const response = await axios.post('https://localhost:5001/api/auth/login');
      const accessToken = response.data.accesstoken;
      localStorage.setItem('accessToken', accessToken);

      const refreshToken = response.data.refreshToken;
      if (credentials.stayLoggedIn && refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      const userResponse = await axios.get('https://localhost:5001/api/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = userResponse.data;

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      console.log('User logged in:', user);
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const requestOtp = async (email) => {
    try {
      await axios.post('https://localhost:5001/api/auth/generate-otp', { email });
      console.log('OTP requested successfully');
    } catch (error) {
      console.error('OTP request error:', error);
    }
  };

  const verifyOtp = async (email, otp, newPassword) => {
    try {
      await axios.put('https://localhost:5001/api/auth/change-password-after-otp', { email, otp, newPassword });
      console.log('Password changed successfully');
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, requestOtp, verifyOtp }}>
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

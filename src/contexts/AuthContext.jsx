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

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken && !refreshToken) {
      dispatch({ type: 'LOGOUT' });
    } else {
      axios.get('https://localhost:5001/api/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => {
          dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        })
        .catch(() => {
          dispatch({ type: 'LOGOUT' });
        });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('https://localhost:5001/api/auth/login', credentials, {
        withCredentials: true,
      });
      const accessToken = response.data.token;
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

  const refreshTokens = async (onSessionExpired) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      onSessionExpired("A munkamenet lejárt");
      return;
    }
    try {
      const response = await axios.post('https://localhost:5001/api/auth/refresh-token', null, {
        headers: { refreshToken },
        withCredentials: true,
      });
      const accessToken = response.data.token;
      localStorage.setItem('accessToken', accessToken);

      // Példa tesztkérés, user adatok lekérése
      const userResponse = await axios.get('https://localhost:5001/api/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: userResponse.data });
    } catch (error) {
      onSessionExpired("Munkamenet lejárt");
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, requestOtp, verifyOtp, refreshTokens }}>
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

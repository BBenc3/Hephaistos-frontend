import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/auth";

const initialState = {
  isLoggedIn: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isLoggedIn: true, error: null };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);



  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Hibás bejelentkezési adatok.";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  const requestOtp = async (email) => {
    try {
      await axios.post(`${API_BASE_URL}/generate-otp`, { email });
    } catch (error) {
      console.error("OTP request error:", error);
    }
  };

  const verifyOtp = async (email, otp, newPassword) => {
    try {
      await axios.put(`${API_BASE_URL}/change-password-after-otp`, {
        email,
        otp,
        newPassword,
      });
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        requestOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

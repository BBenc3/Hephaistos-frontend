import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserData from "../hooks/useUserData";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useUserData();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
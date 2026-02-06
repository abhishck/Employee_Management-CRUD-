import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/authContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAppContext();

  if (loading) {
    return <h3>Checking authentication...</h3>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

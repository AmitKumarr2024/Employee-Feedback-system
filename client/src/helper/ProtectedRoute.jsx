import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children components (protected content)
  return children;
};

export default ProtectedRoute;

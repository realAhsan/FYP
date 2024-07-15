import React from "react";
import { Navigate } from "react-router-dom";

// Dummy authentication function
const isAuthenticated = () => {
  // Replace this with real authentication logic
  return localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;

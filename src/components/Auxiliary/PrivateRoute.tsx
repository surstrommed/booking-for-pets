import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  return sessionStorage?.authToken ? true : false;
};

export const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/signin" />;
};

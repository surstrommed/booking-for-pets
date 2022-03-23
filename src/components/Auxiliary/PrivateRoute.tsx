import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const useAuth = () => {
  return sessionStorage?.authToken ? true : false;
};

export const PrivateRoute = ({ children }) => {
  const location = useLocation().pathname;
  const auth = useAuth();
  if (location === "/signin" || location === "/signup") {
    return auth ? <Navigate to="/" /> : children;
  } else {
    return auth ? children : <Navigate to="/signin" />;
  }
};

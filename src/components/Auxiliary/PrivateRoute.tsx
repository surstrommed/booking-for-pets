import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation().pathname;
  if (location === "/signin" || location === "/signup") {
    return sessionStorage?.token ? <Navigate to="/" /> : children;
  } else {
    return sessionStorage?.token ? children : <Navigate to="/signin" />;
  }
};

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../helpers/types";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth?.payload ? true : false;
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

import React from "react";
import { connect } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const RRoute = ({ action, component: Component, ...routeProps }) => {
  const WrapperComponent = (componentProps) => {
    action(componentProps.match);
    return <Component {...componentProps} />;
  };
  return <Route {...routeProps} element={WrapperComponent} />;
};

export const CRRoute = connect(null, {
  action: (match) => ({ type: "ROUTE", match }),
})(RRoute);

export const ProtectedRoute = ({
  fallback = "/",
  component: Component,
  ...routeProps
}) => {
  const WrapperComponent = (componentProps) => {
    if (sessionStorage?.authToken) {
      return <Component {...componentProps} />;
    }
    return <Navigate to={fallback} />;
  };
  return <CRRoute {...routeProps} component={WrapperComponent} />;
};

import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { Profile } from "./Profile";
import Login from "./Login";
import Register from "./Register";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";

function MainPage() {
  return <div>This is stub</div>;
}

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/signup"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

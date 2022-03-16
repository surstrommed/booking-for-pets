import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { Profile } from "./Profile";
import Login from "./Login";
import Register from "./Register";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";

function Stub() {
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>This is stub</div>
  );
}

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Stub />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
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

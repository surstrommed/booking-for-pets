import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { Profile } from "./Profile";
import Login from "./Login";
import Register from "./Register";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";

function MainPage() {
  return (
    <div className="Main">
      <div className="Top">
        <div className="MainImageBoard">
          <img
            src="https://i.ibb.co/qyX9783/febvuibvbi3v.jpg"
            alt="Main image board"
          />
        </div>
      </div>
    </div>
  );
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

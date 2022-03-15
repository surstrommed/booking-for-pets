import React from "react";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { Profile } from "./Profile";

const Content = ({ children }) => <div className="Content">{children}</div>;

function Stub() {
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>This is stub</div>
  );
}

export default function Main() {
  return (
    <Content>
      <Routes>
        <Route path="/" element={<Stub />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Content>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Register";
import MyAccount from "../components/Dashboard/MyAccount";
import MyJournal from "../components/Dashboard/MyJournal";

 // The Routes component is a container for all Route components
    // It manages which component should be rendered based on the current URL

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/users/profile/me" element={<MyAccount />} />
      <Route path="/users/journals" element={<MyJournal />} />
    </Routes>
  );
};

export default Router;

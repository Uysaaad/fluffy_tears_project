import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Signup from "../pages/Register";
import MyAccount from "../components/Dashboard/MyAccount";
import MyJournal from "../components/Dashboard/MyJournal";
// import AddJournal from "../components/Dashboard/AddJournal"; // Ensure this component is created
// import EmotionGallery from "../components/Dashboard/EmotionGallery"; // Ensure this component is created

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/users/profile/me" element={<MyAccount />} />
      <Route path="/users/journals" element={<MyJournal />} />
      {/* Note the wildcard '*' to match nested routes */}
      {/* <Route path="/add-journal" element={<AddJournal />} /> */}
      {/* <Route path="/emotion-gallery" element={<EmotionGallery />} /> */}
    </Routes>
  );
};

export default Router;

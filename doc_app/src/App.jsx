import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyApointment from "./Pages/MyAppointment";
import Doctor from "./Pages/Doctor";
import MyProfile from "./Pages/MyProfile";
import Appointment from "./Pages/Appointement";

import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:speciality" element={<Doctor />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my_Profile" element={<MyProfile />} />
        <Route path="/my_Appointment" element={<MyApointment />} />
        <Route path="/appointment/:doc_Id" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

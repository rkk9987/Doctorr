import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./Pages/Admin/AddDoctor";
import Dashboard from "./Pages/Admin/Dashboard";
import AllAppointments from "./Pages/Admin/AllAppointments";
import DoctorList from "./Pages/Admin/DoctorList";
const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9D">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route element={<></>} path="/" />

          <Route element={<AddDoctor />} path="/add-doctor" />
          <Route element={<Dashboard />} path="/admin-dashboard" />
          <Route element={<AllAppointments />} path="/all-appointment" />
          <Route element={<DoctorList />} path="/doctor-list" />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;

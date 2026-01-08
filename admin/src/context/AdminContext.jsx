import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const AdminContext = createContext();
import { toast } from "react-toastify";

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctor, setDoctor] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashData, setDashData] = useState([]);

  const getAllDoctor = () => {
    try {
      axios
        .get("http://localhost:8001/api/admin/all-doctor", {
          headers: { aToken },
        })
        .then((res) => {
          console.log(res.data);
          setDoctor(res.data.Doctor);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAppointments = () => {
    axios
      .get("http://localhost:8001/api/admin/all-appointments", {
        headers: { aToken },
      })
      .then((res) => {
        // console.log(res.data.appointments);
        setAppointment(res.data.appointments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDashData = () => {
    try {
      axios
        .get("http://localhost:8001/api/admin/dashboard", {
          headers: { aToken },
        })
        .then((res) => {
          // console.log(res.data.dashData);
          // console.log(res.data.dashData, res.data.dashData.latestAppointments);

          setDashData(res.data.dashData);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const cancelAppointment = (appointmentId) => {
    try {
      axios
        .post(
          "http://localhost:8001/api/admin/admin-cancel-appointments",
          { appointmentId },
          { headers: { aToken } }
        )
        .then((res) => {
          toast.success(res.data.message);
          getAllAppointments();
          // getAllDoctor();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(err);
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    aToken,
    backendUrl,
    setAToken,
    doctor,
    getAllDoctor,
    appointment,
    getAllAppointments,
    setAppointment,
    appointment,
    getDashData,
    dashData,
    cancelAppointment,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

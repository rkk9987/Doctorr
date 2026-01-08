import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const DoctorContext = createContext();
import { toast } from "react-toastify";

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);

  const getAppointments = () => {
    try {
      axios
        .get("http://localhost:8001/api/doctor/appointments", {
          headers: { dToken },
        })
        .then((res) => {
          console.log(res.data.appointments.reverse());

          setAppointments(res.data.appointments.reverse());
        })
        .catch((err) => {});
    } catch (error) {
      toast.error(err.response.data.message);
      console.log(error);
    }
  };

  const value = {
    dToken,
    setDToken,
    appointments,
    getAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

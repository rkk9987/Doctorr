import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);
  return <div></div>;
};

export default DoctorAppointments;

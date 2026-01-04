import React from "react";
import { createContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctor, setDoctor] = useState([]);

  const getAllDoctor = () => {
    try {
      axios
        .get("http://localhost:8001/api/doctor/doctor-list")
        .then((res) => {
          // console.log(res.data);
          setDoctor(res.data.Doctor);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
    doctor,
    getAllDoctor,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

import React from "react";
import { createContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { useEffect } from "react";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctor, setDoctor] = useState([]);
  const [uToken, setUToken] = useState(
    localStorage.getItem("uToken") ? localStorage.getItem("uToken") : ""
  );

  const [userData, setUserData] = useState(false);

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

  // const getDoctorsData = () => {};

  useEffect(() => {
    getAllDoctor();
  }, []);

  const getUserData = () => {
    try {
      axios
        .get("http://localhost:8001/api/user/get-user-data", {
          headers: { uToken },
        })
        .then((res) => {
          setUserData(res.data.User);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (uToken) {
      getUserData();
    } else {
      setUserData(false);
    }
  }, [uToken]);

  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
    doctor,
    uToken,
    setUToken,
    userData,
    setUserData,
    getUserData,
    getAllDoctor,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

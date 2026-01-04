import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctor, setDoctor] = useState([]);

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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    aToken,
    backendUrl,
    setAToken,
    doctor,
    getAllDoctor,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

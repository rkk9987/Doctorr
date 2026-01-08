import React from "react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        axios
          .post("http://localhost:8001/api/admin/login", { email, password })
          .then((res) => {
            localStorage.setItem("aToken", res.data.token);
            setAToken(res.data.token);
            toast.success(res.data.message);
          })
          .catch((err) => {
            // console.log(err);
            toast.error(err.response.data.message);
          });
      } else {
        // console.log("came");

        axios
          .post("http://localhost:8001/api/doctor/login", { email, password })
          .then((res) => {
            localStorage.setItem("dToken", res.data.dtoken);
            setDToken(res.data.dtoken);
            // console.log(res.data);
            // navigate("/");
            // toast.success(res.data.message);
          })
          .catch((err) => {
            // console.log(err);
            toast.error(err.response.data.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg  ">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span>
          Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md tecxt-base"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login ?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Doctor");
              }}
            >
              {" "}
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login ?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Admin");
              }}
            >
              {" "}
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

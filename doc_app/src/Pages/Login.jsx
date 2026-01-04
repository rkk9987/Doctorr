import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const login = () => {
  const navigate = useNavigate();
  const { uToken, setUToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      axios
        .post("http://localhost:8001/api/user/register", {
          name,
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } else {
      axios
        .post("http://localhost:8001/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          // console.log(res.data);
          setUToken(res.data.token);
          localStorage.setItem("uToken", res.data.token);
          // toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (uToken) navigate("/");
  }, [uToken]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-[repeat(auto-fill,minmax(200px,1fr))] items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"}to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name </p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </div>

        <button
          onClick={onSubmitHandler}
          ype="submit"
          className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account{" "}
            <span
              className="text-[#5f6fff] underline cursor-pointer"
              onClick={() => {
                setState("login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account ?{" "}
            <span
              className="text-[#5f6fff] underline cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default login;

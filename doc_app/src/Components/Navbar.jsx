import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink className="group relative" to="/">
          <li className="py-1 hover:text-blue-800 cursor-pointer">HOME</li>
          {/* <hr className="border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden" /> */}
          <span className="absolute left-0 bottom-0 block h-[2px] w-0 bg-[#5f6fff] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink className="group relative" to="/doctor">
          <li className="py-1 hover:text-blue-800 cursor-pointer">
            ALL DOCTOR
          </li>
          <span className="absolute left-0 bottom-0 block h-[2px] w-0 bg-[#5f6fff] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink className="group relative" to="/about">
          <li className="py-1 hover:text-blue-800 cursor-pointer">ABOUT</li>
          <span className="absolute left-0 bottom-0 block h-[2px] w-0 bg-[#5f6fff] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink className="group relative" to="/contact">
          <li className="py-1 hover:text-blue-800 cursor-pointer">CONTACT</li>
          <span className="absolute left-0 bottom-0 block h-[2px] w-0 bg-[#5f6fff] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my_Profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my_Appointment");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    setToken(false);
                  }}
                >
                  {" "}
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-[#5F6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              src={assets.cross_icon}
              onClick={() => setShowMenu(false)}
              alt=""
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/doctor"
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

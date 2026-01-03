import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-20 ">
      <div className="md:mx-10 flex justify-between ">
        {/* left */}
        <div className="flex-[3] flex-col text-sm ">
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, a
            odit officiis corrupti perferendis autem consectetur suscipit
            nostrum sed, alias voluptatibus et commodi rerum dolore excepturi,
            velit culpa itaque nisi.
          </p>
        </div>

        {/* center */}
        <div className="flex-[1]">
          <p className="text-xl  font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-2 text-gray-600 ">
            <li
              className="cursor-pointer hover:text-blue-800"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-blue-800"
              onClick={() => {
                navigate("/about");
              }}
            >
              About Us
            </li>
            <li
              className="cursor-pointer hover:text-blue-800"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us
            </li>
            <li className="cursor-pointer hover:text-blue-800">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* right  */}
        <div className="flex-[1]">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-blue-800">
              +1 -212-5456-8765{" "}
            </li>
            <li className="cursor-pointer hover:text-blue-800">
              rkkarna6693@gmail.com
            </li>
          </ul>
        </div>

        {/* copyright text  */}
      </div>
      <div className="mt-10">
        <hr />
        <p className="py-5 text-sm text-center">
          copyright 2024@ Doctorr - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

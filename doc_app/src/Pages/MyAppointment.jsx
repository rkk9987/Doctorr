import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
const MyAppointment = () => {
  const { doctor, uToken, getAllDoctor } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      axios
        .get("http://localhost:8001/api/user/appointments", {
          headers: { uToken },
        })
        .then((res) => {
          console.log(res.data);

          setAppointment(res.data.appointments.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, []);

  const cancelAppointment = (appointmentId) => {
    try {
      axios
        .post(
          "http://localhost:8001/api/user/cancel-appointment",
          { appointmentId },
          { headers: { uToken } }
        )
        .then((res) => {
          toast.success(res.data.message);
          getUserAppointments();
          getAllDoctor();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      <div>
        {appointment.slice(0, 5).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50 "
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-neutral-800 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime} IST
              </p>
            </div>
            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => {
                    cancelAppointment(item._id);
                  }}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[red] hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded  transition-all duration-300">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;

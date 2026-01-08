const {
  doctorlist,
  loginDoctor,
  doctorAppointments,
} = require("../controllers/doctor.controller");
const { doctorAuth } = require("../middlewares/doctor.middleware");

const docRouter = require("express").Router();

docRouter.get("/doctor-list", doctorlist);
docRouter.post("/login", loginDoctor);
docRouter.get("/appointments", doctorAuth, doctorAppointments);

module.exports = docRouter;

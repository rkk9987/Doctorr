const { doctorlist } = require("../controllers/doctor.controller");

const docRouter = require("express").Router();

docRouter.get("/doctor-list", doctorlist);

module.exports = docRouter;

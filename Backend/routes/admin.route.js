const adminRoute = require("express").Router();
const {
  addDoctor,
  login,
  allDoctors,
  allAppointments,
  cancelAppointment,
  adminDashboard,
} = require("../controllers/admin.controller");
const { changeAvailability } = require("../controllers/doctor.controller");
const { authAdmin } = require("../middlewares/authAdmin.middleware");
const upload = require("../middlewares/multer");

adminRoute.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoute.post("/login", login);
adminRoute.get("/all-doctor", authAdmin, allDoctors);
adminRoute.post("/change-availability", authAdmin, changeAvailability);
adminRoute.get("/all-appointments", authAdmin, allAppointments);
adminRoute.post("/admin-cancel-appointments", authAdmin, cancelAppointment);
adminRoute.get("/dashboard", authAdmin, adminDashboard);

module.exports = adminRoute;

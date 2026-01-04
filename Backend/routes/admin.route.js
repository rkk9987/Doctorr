const adminRoute = require("express").Router();
const {
  addDoctor,
  login,
  allDoctors,
} = require("../controllers/admin.controller");
const { changeAvailability } = require("../controllers/doctor.controller");
const { authAdmin } = require("../middlewares/authAdmin.middleware");
const upload = require("../middlewares/multer");

adminRoute.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoute.post("/login", login);
adminRoute.get("/all-doctor", authAdmin, allDoctors);
adminRoute.post("/change-availability", authAdmin, changeAvailability);

module.exports = adminRoute;

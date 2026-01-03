const adminRoute = require("express").Router();
const { addDoctor, login } = require("../controllers/admin.controller");
const { authAdmin } = require("../middlewares/authAdmin.middleware");
const upload = require("../middlewares/multer");

adminRoute.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoute.post("/login", login);

module.exports = adminRoute;

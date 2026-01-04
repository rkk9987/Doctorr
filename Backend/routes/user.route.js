const {
  userRegister,
  userLogin,
  getUserData,
  updateUser,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/user.middleware");
const upload = require("../middlewares/multer");
const useRouter = require("express").Router();

useRouter.post("/register", userRegister);
useRouter.post("/login", userLogin);
useRouter.get("/get-user-data", authUser, getUserData);
useRouter.post("/update-user", authUser, upload.single("image"), updateUser);

module.exports = useRouter;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectCloudinary } = require("./config/cloudinary");
const dbConnect = require("./config/mongodb");
const adminRoute = require("./routes/admin.route");

const app = express();
// api middlewares
app.use(cors());
app.use(express.json());

// api endpoints

app.use("/api/admin", adminRoute);

// start server

app.listen(process.env.PORT || 4000, () => {
  dbConnect();
  connectCloudinary();
  console.log("server started ");
});

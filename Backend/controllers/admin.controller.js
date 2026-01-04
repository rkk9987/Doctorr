// API fpr adding doctor
const validator = require("validator");
const doctor = require("../models/Doctor.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const addDoctor = async (req, res) => {
  //   console.log("came");

  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    // console.log("came1");

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }
    // console.log("came2");

    if (!imageFile)
      return res.status(400).json({ success: false, message: "missing image" });
    // console.log("came3");

    const existData = await doctor.exists({ email });

    if (existData) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor Email Already exist" });
    }
    // console.log("came1");
    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "invalid email" });
    // console.log("came2");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("came3");
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    // console.log("came4");
    const docData = await doctor.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    });

    if (docData)
      return res
        .status(201)
        .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "missing credentials" });
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res
        .status(400)
        .json({ success: false, message: "wrong credentials for admin" });

    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, message: "logged in", token });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctorData = await doctor.find().select("-password");
    if (doctorData)
      return res.status(200).json({ success: true, Doctor: doctorData });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error });
  }
};

module.exports = {
  addDoctor,
  login,
  allDoctors,
};

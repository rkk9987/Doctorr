const user = require("../models/User.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "missing details" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    const existData = await user.exists({ email });
    if (existData)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    if (password.length < 5)
      return res.status(400).json({ success: false, message: "Weak password" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = await user.create({ email, name, password: hashedPassword });

    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);
    if (data)
      return res.status(201).json({
        success: true,
        message: "User Registered successfully",
        token,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "missing details" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    const data = await user.findOne({ email });
    if (!data)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });

    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Logged In successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await user.findById(id).select("-password");
    if (data) return res.status(200).json({ success: true, User: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(id);

    const { name, phone, address, gender, dob } = req.body;

    const image = req.file;
    // console.log(req.body);

    if (!name || !phone || !address || !gender || !dob)
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });

    let parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;
    // console.log(address, typeof address, parsedAddress);

    const updatedUser = await user.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        address: parsedAddress,
        gender,
        dob,
      },
      { new: true }
    );

    if (image?.path) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      updatedUser.image = imageUpload.secure_url;
      await updatedUser.save();
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      User: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserData,
  updateUser,
};

const user = require("../models/User.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
// const doctor = require("../models/Doctor.model");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const doctor = require("../models/Doctor.model");
// const user = require("../models/User.model");
const appointmentModel = require("../models/appointment.model");
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

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const { id } = req.user;
    const docData = await doctor.findById(docId).select("-password");
    if (!docData.available)
      return res.json({ success: false, message: "Doctor not available" });

    let slots_booked = docData.slots_booked;

    //checking for slots availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await user.findById(id).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId: id,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctor.findByIdAndUpdate(docId, { slots_booked });

    return res
      .status(201)
      .json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { id } = req.user;

    const appointments = await appointmentModel.find({ userId: id });
    return res.status(200).json({ sucess: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== id)
      return res.json({ success: false, message: "Unauthorized action" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctor.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctor.findByIdAndUpdate(docId, { slots_booked });
    return res
      .status(200)
      .json({ success: true, message: "Appoinment cancelled successfully" });
  } catch (error) {}
};

module.exports = {
  userRegister,
  userLogin,
  getUserData,
  updateUser,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};

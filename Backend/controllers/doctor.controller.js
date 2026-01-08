const doctor = require("../models/Doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointment.model");
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId)
      return res
        .status(400)
        .json({ success: false, message: "DocId required" });
    const docData = await doctor.findById(docId);
    await doctor.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    return res
      .status(200)
      .json({ success: true, message: "Availabiity changed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

const doctorlist = async (req, res) => {
  try {
    const doctorData = await doctor.find().select("-email -password").lean();
    if (doctorData)
      return res.status(200).json({ success: true, Doctor: doctorData });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Provide credentials " });

    const doctorData = await doctor.findOne({ email });

    if (!doctorData)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctorData.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const dtoken = jwt.sign({ id: doctorData._id }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, dtoken });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req.user);

    const appointments = await appointmentModel.find({ docId: id });
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  changeAvailability,
  doctorlist,
  loginDoctor,
  doctorAppointments,
};

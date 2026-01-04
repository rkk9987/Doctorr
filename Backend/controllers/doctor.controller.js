const doctor = require("../models/Doctor.model");

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

module.exports = {
  changeAvailability,
  doctorlist,
};

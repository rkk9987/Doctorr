const jwt = require("jsonwebtoken");

const doctorAuth = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized , Login again" });

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

module.exports = { doctorAuth };

const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized Login again" });

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    // req.user=decoded.id
    // console.log(decoded);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      return res
        .status(400)
        .json({ success: false, message: "UnAuthorized, Login again" });

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

module.exports = { authAdmin };

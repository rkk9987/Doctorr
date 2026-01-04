const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { utoken } = req.headers;
    if (!utoken)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(utoken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = {
  authUser,
};

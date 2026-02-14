const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackList.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is missing" });
  }

  const isBlackList = await tokenBlackListModel.findOne({ token });

  if (isBlackList) {
    return res.status(403).json({
      message: "Unauthorized access, token is invalid",
    });
  }

  try {
    //Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Find user
    const user = await User.findById(decoded.userId);
    //Setting user
    req.user = user;
    //Forword user
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is invalid" });
  }
}

async function authSystemUserMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, token is missing",
    });
  }

  const isBlackList = await tokenBlackListModel.findOne({ token });

  if (isBlackList) {
    return res.status(403).json({
      message: "Unauthorized access, token is invalid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("+systemUser");

    if (!user.systemUser) {
      return res.status(403).json({
        message: "Forbidden access, not a system user",
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is invalid" });
  }
}

module.exports = { authMiddleware, authSystemUserMiddleware };

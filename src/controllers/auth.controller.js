const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

/* 
1. user register controller 
2. POST = /api/auth/register
*/
async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await User.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "Email already exists with this email.",
      status: "failed",
    });
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

/* 
1. user login controller 
2. POST = /api/auth/login
*/
async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
    });
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

module.exports = { userRegisterController, userLoginController };

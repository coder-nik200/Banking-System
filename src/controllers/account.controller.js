const Account = require("../models/account.model");

async function createAccountController(req, res) {
  const user = req.user;

  const account = await Account.create({
    user: user._id,
  });

  res.status(201).json({ account });
}

async function getUserAccountController(req, res) {
  const accounts = await Account.find({ user: req.user._id });

  res.status(200).json({ accounts });
}

module.exports = { createAccountController, getUserAccountController };

const express = require("express");

const router = express.Router();
const authContrller = require("../controllers/auth.controller");

/* POST /api/auth/register */
router.post("/register", authContrller.userRegisterController);

/* POST /api/auth/login */
router.post("/login", authContrller.userLoginController);

module.exports = router;

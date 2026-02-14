const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/* 
1. POST /api/accounts
2. Create new account
3. Protected Route
 */
router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

/* 
1. GET /api/accounts
2. Get all accounts of the logged-in user
3. Protected Route
 */
router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountController,
);

module.exports = router;

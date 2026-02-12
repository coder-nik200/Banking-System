const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");

const router = express.Router();

/* 
1. POST /api/transactions
2. Create new transaction
3. Protected Route
 */
router.post(
  "/",
  authMiddleware.authMiddleware,
  transactionController.createTransaction,
);

module.exports = router;

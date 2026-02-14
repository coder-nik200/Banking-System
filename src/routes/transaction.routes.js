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

/*
1. POST /api/transactions/system/initial-funds
2. Create initial funds transaction from system user 
*/

router.post(
  "/system/initial-funds",
  authMiddleware.authSystemUserMiddleware,
  transactionController.createInitialFundsTransaction,
);

module.exports = router;

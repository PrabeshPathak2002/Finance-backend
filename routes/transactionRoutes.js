const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Add a new transaction
router.post("/add", async (req, res) => {
  try {
    const { type, description, amount } = req.body;
    const newTransaction = new Transaction({ type, description, amount });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added!", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ error: "Error adding transaction" });
  }
});

// Get all transactions
router.get("/all", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

module.exports = router;
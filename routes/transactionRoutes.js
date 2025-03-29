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

// Update a transaction
router.put("/update/:id", async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTransaction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a transaction
  router.delete("/delete/:id", async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


module.exports = router;
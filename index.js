require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple route
app.get("/", (req, res) => {
  res.send("Finance API is running...");
});

app.post("/add", async (req, res) => {
    try {
        const { type, description, amount } = req.body;
        const newTransaction = new Transaction({ type, description, amount });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/transactions", transactionRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
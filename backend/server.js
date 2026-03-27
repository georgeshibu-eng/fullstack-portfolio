const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // ✅ IMPORTANT

const connectDB = require("./db");
const Contact = require("./models/Contact");

const app = express();

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Serve resume statically
app.use("/public", express.static(path.join(__dirname, "public")));

// Contact form API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("📩 New Contact Saved to DB");

    res.json({
      success: true,
      message: "Message saved successfully!"
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
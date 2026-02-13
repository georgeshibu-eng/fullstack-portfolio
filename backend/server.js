const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");              // 👈 ADD
const Contact = require("./models/Contact");   // 👈 ADD

const app = express();
const PORT = 5000;

// Connect Database
connectDB();                                    // 👈 ADD

app.use(cors());
app.use(express.json());

// Serve resume statically
app.use("/public", express.static(path.join(__dirname, "public")));

// Contact form API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save(); // ✅ STORED IN DB

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
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

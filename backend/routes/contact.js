const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.send("Message saved successfully");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;

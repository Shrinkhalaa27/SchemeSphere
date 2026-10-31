const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const feedbacks = [];

router.post("/", (req, res) => {
  const { name, email, type, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email, message required" });
  }
  const feedback = {
    id: uuidv4(), name, email,
    type: type || "general",
    subject: subject || "",
    message,
    createdAt: new Date().toISOString()
  };
  feedbacks.push(feedback);
  console.log("New feedback from", email);
  res.json({ success: true, message: "Thank you! Our team at 2330403@kiit.ac.in will review it." });
});

router.get("/", (req, res) => {
  res.json({ success: true, count: feedbacks.length, data: feedbacks });
});

module.exports = router;
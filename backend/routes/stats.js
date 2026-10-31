const express = require("express");
const router = express.Router();
const schemes = require("../data/schemes");

router.get("/", (req, res) => {
  res.json({ success: true, data: {
    totalSchemes: schemes.length,
    centralSchemes: schemes.filter(s => s.state === "Central").length,
    stateSchemes: schemes.filter(s => s.state !== "Central").length,
    categories: [...new Set(schemes.map(s => s.category))].length,
    beneficiariesCrore: 85
  }});
});

module.exports = router;
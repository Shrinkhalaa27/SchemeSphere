const express = require("express");
const router = express.Router();
const schemes = require("../data/schemes");

router.get("/", (req, res) => {
  let result = [...schemes];
  const { q, category, targetGroup, schemeType, sort } = req.query;
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  if (category && category !== "All") result = result.filter(s => s.category === category);
  if (schemeType && schemeType !== "All") {
    result = result.filter(s => s.state === (schemeType === "Central Govt" ? "Central" : "State"));
  }
  if (targetGroup && targetGroup !== "All") result = result.filter(s => s.targetGroup.includes(targetGroup));
  if (sort === "latest") result = result.sort((a, b) => b.launchedYear - a.launchedYear);
  res.json({ success: true, count: result.length, data: result });
});

router.get("/suggestions", (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ success: true, data: [] });
  const query = q.toLowerCase();
  const suggestions = [];
  const seen = new Set();
  schemes.forEach(s => {
    s.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query) && !seen.has(tag)) { suggestions.push(tag); seen.add(tag); }
    });
    if (s.name.toLowerCase().includes(query) && !seen.has(s.name)) { suggestions.push(s.name); seen.add(s.name); }
  });
  res.json({ success: true, data: suggestions.slice(0, 8) });
});

router.get("/trending", (req, res) => {
  res.json({ success: true, data: schemes.filter(s => s.trending) });
});

router.get("/:id", (req, res) => {
  const scheme = schemes.find(s => s.id === req.params.id);
  if (!scheme) return res.status(404).json({ success: false, error: "Not found" });
  res.json({ success: true, data: scheme });
});

module.exports = router;
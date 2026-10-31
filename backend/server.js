const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/schemes", require("./routes/schemes"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/stats", require("./routes/stats"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SchemeSphere API is running!" });
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "SchemeSphere API", version: "1.0.0", status: "running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 SchemeSphere API running on http://localhost:${PORT}`);
  console.log(`✅ Routes: /api/schemes | /api/chat | /api/feedback | /api/stats`);
  console.log(`🔍 Test: http://localhost:${PORT}/api/health\n`);
});
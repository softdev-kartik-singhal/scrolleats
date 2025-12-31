const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes FIRST - these must be before static files
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));
app.use("/api/food-partner", require("./routes/food-partner.routes"));

// Serve static files from React build
const distPath = path.join(__dirname, "../../frontend/ScrollEats/dist");
app.use(express.static(distPath));

// SPA fallback - serve index.html for all non-API routes
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

module.exports = app;

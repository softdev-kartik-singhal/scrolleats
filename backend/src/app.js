const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes ONLY
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));
app.use("/api/food-partner", require("./routes/food-partner.routes"));

// Serve frontend static files (AFTER API routes)
app.use(express.static(path.join(__dirname, "../../frontend/ScrollEats/dist")));

// React SPA fallback - catch all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/ScrollEats/dist/index.html"));
});

module.exports = app;

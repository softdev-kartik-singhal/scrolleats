const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes ONLY
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));
app.use("/api/food-partner", require("./routes/food-partner.routes"));

module.exports = app;

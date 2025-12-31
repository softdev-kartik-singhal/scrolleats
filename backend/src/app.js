const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Trust proxy - REQUIRED for Render/Heroku to properly handle HTTPS
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
app.use(
  cors({
    origin: "https://scrolleats-application.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));
app.use("/api/food-partner", require("./routes/food-partner.routes"));

module.exports = app;

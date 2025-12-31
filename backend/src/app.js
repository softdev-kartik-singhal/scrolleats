const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Trust proxy (important for Render)
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// CORS — needed ONLY for API access
app.use(
  cors({
    origin: "https://scrolleats.onrender.com",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));
app.use("/api/food-partner", require("./routes/food-partner.routes"));

module.exports = app;

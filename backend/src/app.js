const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://scrolleats-application.onrender.com",
    credentials: true,
  })
);

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reels", require("./routes/reels.routes"));

module.exports = app;

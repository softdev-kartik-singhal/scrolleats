const express = require("express");
const path = require("path");
require("dotenv").config();

const app = require("./src/app");
const database = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect DB
database();

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/ScrollEats/dist")));

// React fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/ScrollEats/dist/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

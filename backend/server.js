const express = require("express");
const path = require("path");
require("dotenv").config();

const app = require("./src/app");
const database = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect DB
database();

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

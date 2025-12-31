// create server

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes")
const reelsRoutes = require("./routes/reels.routes")
const foodPartnerRoutes = require("./routes/food-partner.routes")
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());

// CORS configuration - simplified for local development
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use('/api/auth', authRoutes);
app.use('/api/reels', reelsRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


module.exports = app;


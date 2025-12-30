// create server

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes")
const foodRoutes = require("./routes/foodItem.routes")
const foodPartnerRoutes = require("./routes/food-partner.routes")
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "https://scrolleats-application.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps / Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


module.exports = app;


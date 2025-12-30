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
app.use(cors({
    origin: "https://scrolleats.netlify.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));


app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


module.exports = app;


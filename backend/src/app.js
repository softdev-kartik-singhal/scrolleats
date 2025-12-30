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
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);


module.exports = app;


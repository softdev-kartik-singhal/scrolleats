const mongoose = require("mongoose");

const dburl = process.env.DB_URL;

function connectDB() {
    mongoose.connect(dburl)
    .then(()=> {
        console.log("connected to Database");
    })
    .catch((err) => {
        console.log(`Database connection error : ${err}`);
    })
}

module.exports = connectDB;
// start server
require('dotenv').config();
const app = require("./src/app.js");
const port =  process.env.PORT || 3000
const database = require("./src/db/db.js");


database();

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
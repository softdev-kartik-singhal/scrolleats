// start server
require('dotenv').config();
const app = require("./src/app.js");
const port =  process.env.PORT || 3000
const database = require("./src/db/db.js");

database();
app.use("/api", require("./src/routes"));
app.use(express.static(path.join(__dirname, "../frontend/ScrollEats/dist")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/ScrollEats/dist/index.html")
  );
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
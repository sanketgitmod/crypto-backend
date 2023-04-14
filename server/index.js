require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

require("./start/db")();

require("./start/routes")(app);

app.listen(process.env.PORT, () => console.log("listening..."));

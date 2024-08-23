const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const alienRouter = require("./routes/aliens.js");

const url =
  "mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbit?replicaSet=m101";
const app = express();
mongoose.connect(url);

mongoose.connection.on("connected", () => {
  console.log("Connected To MongoDB Successfully.");
});

mongoose.connection.on("error", () => {
  console.log("Not Connected To MongoDB.");
});

app.use(cors());
app.use(express.json());

app.use("/aliens", alienRouter);

app.listen(9000, () => {
  console.log("Server started");
});

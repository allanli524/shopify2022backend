require("dotenv");
("use strict");
const mongoose = require("mongoose");
console.log(process.env.DB_ACCESS);
const connect = mongoose
  .connect(
    process.env.DB_ACCESS ||
      "mongodb+srv://<username>:<password>@cluster0.ai3ni.mongodb.net/Team46?retryWrites=true&w=majority",
    console.log("connected mongoDB")
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error(err));

module.exports = { mongoose, connect };

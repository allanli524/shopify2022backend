require("dotenv").config({ path: `${__dirname}/.env` });
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//origin
app.get("/", (req, res) => {
  res.send("listening");
});

//below are utility endpoints
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/warehouse", require("./routes/warehouse"));

//server listening
console.log(process.env.PORT);
app.listen(process.env.PORT || 5050, () => console.log("Server running"));

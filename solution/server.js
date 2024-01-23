const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  fs.readFile("./../Artikel.csv", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      res.status(500).send("Server error");
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  fs.writeFile("./../Artikel_new.csv", req.body.data, (err) => {
    if (err) throw err;
    res.send("File is created");
  });
});

const port = process.env.REACT_APP_SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

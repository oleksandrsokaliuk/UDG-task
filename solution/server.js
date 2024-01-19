const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();
var cors = require("cors");

app.use(cors());

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

const port = process.env.REACT_APP_SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

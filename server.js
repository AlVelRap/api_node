require("dotenv").config(); // environement variables
const express = require("express");
const app = express();
const path = require("path");

// Variables
const PORT = process.env.EXPRESS_PORT || 3000;
const HOST = process.env.EXPRESS_HOST || "localhost";
const conn = require("./db_connection");

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// conection to db
app.get("/user", (req, res) => {
  conn.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: err.message || "Some error ocurred findinf users.",
      });
      return;
    }

    if (result.length) {
      console.log("user found: ", result);
      res.send(result)
      return;
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});

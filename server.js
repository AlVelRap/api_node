const express = require("express");
const app = express();
const path = require('path');

const PORT = 3000; // change this in the future to another file and take variables from .env

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

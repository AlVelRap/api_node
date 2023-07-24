require("dotenv").config(); // environement variables
const express = require("express");
const app = express();
const path = require("path");

// Variables
const PORT = process.env.EXPRESS_PORT || 3000;
const HOST = process.env.EXPRESS_HOST || "localhost";

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Our routes
require("./routes/user.route")(app)

app.listen(PORT, () => {
  if(process.env.DB_HOST == "localhost")
    console.log(`App listening on http://${HOST}:${PORT}`);
  else
    console.log(`App listening on http://${HOST}:${process.env.NODE_LOCAL_PORT}`);
});

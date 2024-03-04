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

// Synchronize DB
const db = require("./models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Our routes
require("./routes/user.route")(app)

app.listen(PORT, () => {
  if(process.env.DB_HOST == "localhost")
    console.log(`App listening on http://${HOST}:${PORT}`);
  else
    console.log(`App listening on http://${HOST}:${process.env.NODE_LOCAL_PORT}`);
});

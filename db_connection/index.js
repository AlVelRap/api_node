const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  multipleStatements: true,
});

conn.connect(function (err) {
  if (!err) console.log("Connected!");
  else console.log("Connection failed: " + err);
});

module.exports = conn;

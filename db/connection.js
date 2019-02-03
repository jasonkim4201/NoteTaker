const mysql = require("mysql");

var connection;

// Sets up db to connect locally or on JAWSDB if deployed on heroku

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: process.env.user,
    password: process.env.pass,
    database: "notetaker_db"
  });
}



module.exports = connection;
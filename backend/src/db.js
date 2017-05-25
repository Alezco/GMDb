
const mysql             = require('mysql');

// DATABASE INITIALISATION
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database : "gmbd",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.connection = connection;

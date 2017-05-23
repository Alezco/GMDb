// index.js
const express = require('express');
const bodyParser = require('body-parser');
const minify = require('express-minify');
const mysql = require('mysql');
const app = express();

// DODGE CROS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(minify());
app.use(express.static("."));
app.use(bodyParser.json())


let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/signIn', (req, res) => {
  let login = req.body.login;
  let pwd = req.body.pwd;
  console.log(login);
  console.log(pwd);
  res.send("Done");
});

// start your server
app.listen(4242, () => {
  console.log('GMBD server listening on port 4242!');
});

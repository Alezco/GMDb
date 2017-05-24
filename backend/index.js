// index.js
const express           = require('express');
const bodyParser        = require('body-parser');
const minify            = require('express-minify');
const mysql             = require('mysql');
const session           = require('express-session');

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


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'shhhhh'}));

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


// SESSION USER
var sess;

app.get('/', function(req, res) {
    // the user was found and is available in req.user
    sess = req.session;
    if(sess.email) {
      res.send('OK is authentificated');
    } else {
      res.send('NO not authentificated');
    }
});

function registerUser(login, password, done) {
  console.log('Registering new user ' + login);
  connection.query("select * from user where login = '"+login+"'", function(err,rows){
      var newUser = null;
      if (err) {
        done(err, newUser);
      }
      if (rows.length) {
        done('User already in base', newUser);
      } else {
        var newUserMysql = new Object();
        newUserMysql.login    = login;
        newUserMysql.password = password;
        var insertQuery = "INSERT INTO user ( login, password ) values ('" + login +"','"+ password +"')";
        console.log(insertQuery);
        connection.query(insertQuery,function(err,rows){
          newUserMysql.id = rows.insertId;
          console.log("all good");
          newUser = newUserMysql;
          done(null, newUser);
        });
      }
    });
}

function logUser(login, password, done) {
  console.log('LogIn user ' + login);
  connection.query("SELECT * FROM user WHERE login = '" + login + "'", function(err,rows){
			if (err) {
        return done(err, null);
      }
			if (!rows.length) {
        return done('No user matching', null);
      }
      if (!( rows[0].password == password)) {
        return done('Password mismatch', null);
      }
      console.log('All good');
      return done(null, rows[0]);
		});
}

function getFilms(done) {
  console.log('get movies');
  connection.query("select * from movie LIMIT 10", function(err,rows){
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        var objs = [];
        for (var i = 0;i < rows.length; i++) {
            objs.push({Title : rows[i].Title});
        }
        connection.end();
        done(null, JSON.stringify(objs));
      }
    });
}

app.post('/signIn', (req, res) => {
    var newUser = registerUser(req.body.login, req.body.pwd, function(err, user) {
      if (err) {
        console.log(err);
        res.send('{ error : '+err+'}');
      }
      console.log(user);
      if (user) {
        res.redirect('/ok')
      }
    });
});

app.post('/logIn', (req, res) => {
    var newUser = logUser(req.body.login, req.body.pwd, function(err, user) {
      if (err) {
        console.log(err);
        res.send('{ error : '+err+'}');
      }
      console.log(user);
      if (user) {
        sess = req.session;
        sess.email=req.body.login;
        res.redirect('/ok')
      }
    });
});


app.get('/films', (req, res) => {
    var newUser = getFilms(function(err, movies) {
      if (err) {
        console.log(err);
        res.send('{ error : '+err+'}');
      }
      console.log(movies);
      if (movies) {
        res.send(movies);
      }
    });
});

// start your server
app.listen(4242, () => {
  console.log('GMBD server listening on port 4242!');
});

// index.js
const express           = require('express');
const bodyParser        = require('body-parser');
const minify            = require('express-minify');
const mysql             = require('mysql');
const Strategy     = require('passport-local').Strategy;
const passport          = require('passport');

passport.use(new Strategy(
  function(username, password, done) {
    console.log('USING STARTEGY')
    console.log(username)
    console.log(password)
    console.log('ready to query');
    connection.query("select * from user where login = '"+username+"'",function(err,rows){
    console.log(rows);
    console.log("above row object");
    if (err) {
        return done(err);
      }
   if (rows.length) {
     console.log("already used")
        return done(null, false);
    } else {

    // if there is no user with that email
    // create the user
    var newUserMysql = new Object();

    newUserMysql.username    = username;
    newUserMysql.password = password; // use the generateHash function in our user model

    var insertQuery = "INSERT INTO user ( login, password ) values ('" + username +"','"+ password +"')";
    console.log(insertQuery);
    connection.query(insertQuery,function(err,rows){
      console.log(err);
      console.log(rows);
        newUserMysql.id = rows.insertId;
        return done(null, newUserMysql);
    });
  };
})
}));

// expose this function to our app using module.exports
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  		 done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  connection.query("select * from user where id = "+id,function(err,rows){
    done(err, rows[0]);
  });
});


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
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


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

/*passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) {
    console.log('ready to query');
    connection.query("select * from user where login = '"+login+"'",function(err,rows){
    console.log(rows);
    console.log("above row object");
  if (err)
            return done(err);
   if (rows.length) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

    // if there is no user with that email
            // create the user
            var newUserMysql = new Object();

    newUserMysql.login    = login;
            newUserMysql.password = password; // use the generateHash function in our user model

    var insertQuery = "INSERT INTO user ( login, password ) values ('" + login +"','"+ password +"')";
    console.log(insertQuery);
    connection.query(insertQuery,function(err,rows){
    newUserMysql.id = rows.insertId;
    return done(null, newUserMysql);
    });
        }
});
}));*/

// traditional route handler, passed req/res
app.post("/signIn2", function(req, res, next) {
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });

  })(req, res, next);

});

app.post('/signIn',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/ok');
  });
/*
app.post("/signIn", passport.authenticate('local', {
    failureRedirect: '/signIn'
}), function(req, res, info){
  let login = req.body.username;
  let pwd = req.body.password;
  console.log(username);
  console.log(password);
  console.log(info);
  res.send("Done");
});*/

/*app.post('/signIn', (req, res) => {
  let login = req.body.login;
  let pwd = req.body.pwd;
  console.log(login);
  console.log(pwd);
  res.send("Done");
});*/

// start your server
app.listen(4242, () => {
  console.log('GMBD server listening on port 4242!');
});

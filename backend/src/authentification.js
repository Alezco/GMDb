const db = require('./db.js');

exports.registerUser = function (login, password, done) {
  console.log('Registering new user ' + login);
  db.connection.query("SELECT * FROM users WHERE login = '" + login + "'", function (err,rows){
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
      var insertQuery = "INSERT INTO users ( login, password, url ) values ('" + login + "','"
      + password + "', 'http://blogs.plos.org/thepanicvirus/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png')";
      console.log(insertQuery);
      db.connection.query(insertQuery, function (err, rows) {
        if (err) {
          console.log(err);
        }
        newUserMysql.id = rows.insertId;
        console.log("All good");
        newUser = newUserMysql;
        done(null, newUser);
      });
    }
  });
};

exports.logUser = function (login, password, done) {
  console.log('Login user ' + login);
  db.connection.query("SELECT * FROM users WHERE login = '" + login + "'", function (err, rows){
    if (err) {
      return done(err, null);
    }
    if (!rows.length) {
      return done('No user matching', null);
    }
    if (!(rows[0].password == password)) {
      return done('Password mismatch', null);
    }
    console.log('All good');
    return done(null, rows[0]);
  });
};

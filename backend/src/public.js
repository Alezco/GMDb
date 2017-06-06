const db = require('./db.js');

exports.getFilms = function(done) {
  console.log('Get movies');
  db.connection.query("SELECT * FROM movies", function (err, rows){
    if (err) {
      done(err, null);
    }
    if (rows.length) {
      done(null, JSON.stringify(rows));
    }
  });
}

exports.getFilmsByID = function(movieID, done) {
  console.log('Get movies filtered by ' + movieID);
  let filterQuery = 'SELECT * FROM movies WHERE id = ?';
  db.connection.query(filterQuery,[movieID], function(err,rows) {
    if (err) {
      done(err, null);
    }
    if (rows.length) {
      done(null, JSON.stringify(rows));
    }
  });
}

exports.getUsers = function(done) {
  console.log('Get users');
  let filterQuery = 'SELECT * FROM users';
  db.connection.query(filterQuery, function(err,rows) {
    if (err) {
      done(err, null);
    }
    if (rows.length) {
      done(null, JSON.stringify(rows));
    }
  });
}

exports.getUserByID = function(userID, done) {
  console.log('Get user with id ' + userID);
  let filterQuery = 'SELECT * FROM users WHERE id = ?';
  db.connection.query(filterQuery, [userID], function(err,rows) {
    if (err) {
      done(err, null);
    }
    if (rows.length) {
      done(null, JSON.stringify(rows));
    }
  });
}

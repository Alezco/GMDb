const db = require('./db.js');

exports.getFilms = function(done) {
  console.log('get movies');
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
  console.log('get movies filtered by ' + movieID);
  let filterQuery = 'SELECT * FROM movies WHERE id = \''+movieID+'\'';
  db.connection.query(filterQuery, function(err,rows) {
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      }
    });
}

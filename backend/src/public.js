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

exports.getFilmsOrder = function(filter, done) {
  console.log('get movies filtered by ' + filter);
  let filterQuery = 'SELECT * FROM movies LIMIT 20';
  db.connection.query(filterQuery, function(err,rows) {
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      }
    });
}

const db = require('./db.js');


exports.getFilms =  function(done) {
  console.log('get movies');
  db.connection.query("select * from movies LIMIT 12", function(err,rows){
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      }
    });
}

exports.getFilmsOrder =  function(filter, done) {
  console.log('get movies filtered by ' + filter);
  let filterQuery = 'select * from movies LIMIT 20';
  db.connection.query(filterQuery, function(err,rows){
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      }
    });
}

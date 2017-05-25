const db = require('./db.js');


exports.getFilms =  function(done) {
  console.log('get movies');
  db.connection.query("select * from movies LIMIT 10", function(err,rows){
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        db.connection.end();
        done(null, JSON.stringify(rows));
      }
    });
}

const db = require('./db.js');


exports.getFilms =  function(done) {
  console.log('get movies');
  db.connection.query("select * from movies LIMIT 10", function(err,rows){
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      }
    });
}

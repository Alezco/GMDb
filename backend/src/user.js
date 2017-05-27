const db = require('./db.js');


    exports.likeMovie = function (movieID, userID, done) {
      console.log('user ' + userID + ' liked the movie ' + movieID);
      db.connection.query("select * from favorites where userID = '"+userID+"' AND movieID = '" + movieID+"'", function(err,rows){
          if (err) {
            done(err, false);
          }
          if (rows.length) {
            done('movie already in favorites', false);
          } else {
            var insertQuery = "INSERT INTO favorites ( userID, movieID ) values ('" + userID +"','"+ movieID +"')";
            console.log(insertQuery);
            db.connection.query(insertQuery,function(err,rows){
              if (err) {
                done(err, false);
              } else {
                console.log("all good nesw favorite id = " + rows.insertId);
                done(null, true);
              }
            });
          }
        });
    };


    exports.myMovies = function (userID, done) {
      console.log('user ' + userID + 'want to see his favorites images');
      db.connection.query("select * from movies JOIN favorites on favorites.movieID = movies.id where userID = '"+userID+"'", function(err,rows) {
          if (err) {
            done(err, null);
          }
          if (rows.length) {
            done(null, JSON.stringify(rows));
          } else {
            done('user do not have favorites', null);
          };
        });
    };

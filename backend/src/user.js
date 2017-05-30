const db = require('./db.js');

exports.likeMovie = function (movieID, userID, done) {
  console.log('user ' + userID + ' liked the movie ' + movieID);
  db.connection.query("select * from favorites where userID = '" + userID + "' AND movieID = '" + movieID + "'", function(err,rows) {
      if (err) {
        done(err, false);
      }
      if (rows.length) {
        done('movie already in favorites', false);
      } else {
        var insertQuery = "INSERT INTO favorites ( userID, movieID ) values ('" + userID + "','" + movieID + "')";
        console.log(insertQuery);
        db.connection.query(insertQuery,function(err,rows){
          if (err) {
            done(err, false);
          } else {
            console.log("all good new favorite id = " + rows.insertId);
            done(null, true);
          }
        });
      }
    });
};

exports.myMovies = function (userID, done) {
  console.log('user ' + userID + 'want to see his favorites movies');
  db.connection.query("SELECT * FROM movies JOIN favorites ON favorites.movieID = movies.id WHERE userID = '" + userID + "'", function(err,rows) {
      if (err) {
        done(err, null);
      }
      if (rows.length) {
        done(null, JSON.stringify(rows));
      } else {
        done('User does not have favorites', null);
      };
    });
};

exports.favoriteByCriteria = function (userID, properties, done) {
  for (var i = 0; i < properties.length; i++) {
    let criteria = properties[i];
    console.log('user ' + userID + 'want to see recommanded base on ' + criteria);
    db.connection.query("select * from movies" +
                        " JOIN favorites on favorites.movieID = movies.id" +
                        " where userID = '" + userID + "'", function(err, rowsFavorites) {
                db.connection.query("SELECT COUNT("+criteria+") AS " + criteria + ", movies." + criteria + " FROM movies" +
                                    " JOIN favorites ON favorites.movieID = movies.id" +
                                    " WHERE userID = '" + userID + "'" +
                                    " GROUP BY " + criteria, function(err,rows) {
                    if (err) {
                      console.log(err);
                    }
                    if (rows.length < rowsFavorites.length) {
                      console.log(rows.length + " " + criteria +" "+ rows[0][criteria]);
                      db.connection.query("SELECT * FROM movies"+
                                          " WHERE " + criteria + " = '" + rows[0][criteria] + "' LIMIT 10",
                                          function(err,rowsfinals) {
                                            if (done !== null) {
                                                if (rowsfinals.length) {
                                                  let description = new Object();
                                                  description.field = rows[0][criteria];
                                                  let movies = new Object();
                                                  movies.list = rows[0][criteria];
                                                  let obj = new Object();
                                                  Object.assign(obj, rowsfinals, description);
                                                  done(null, JSON.stringify(obj));
                                                  done = null;
                                                } else {
                                                  done('user do not have favorites', null);
                                                  done = null;
                                                }
                                            };
                                          });
                    } else {
                      console.log('user do not have favorites based on ' + criteria);
                    };
                  });
                });
              }
  };

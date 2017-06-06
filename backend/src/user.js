const db = require('./db.js');

exports.likeMovie = function (movieID, userID, done) {
  console.log('User ' + userID + ' liked the movie ' + movieID);
  db.connection.query("SELECT * FROM favorites WHERE userID = ? AND movieID = ?", [userID, movieID], function(err,rows) {
    if (err) {
      done(err, false);
    }
    if (rows.length) {
      var insertQuery = "DELETE FROM favorites where userID = ? AND movieID = ?";
      console.log(insertQuery);
      db.connection.query(insertQuery,[userID, movieID],function(err,rows){
        if (err) {
          done(err, false);
        } else {
          console.log("All good delete favorite");
          done(null, 'UnLiked');
        }
      });
    } else {
      var insertQuery = "INSERT INTO favorites ( userID, movieID ) values (?,?)";
      console.log(insertQuery);
      db.connection.query(insertQuery, [userID, movieID], function(err,rows){
        if (err) {
          done(err, false);
        } else {
          console.log("All good new favorite id = " + rows.insertId);
          done(null, 'Liked');
        }
      });
    }
  });
};

exports.myMovies = function (userID, done) {
  console.log('User ' + userID + 'wants to see his favorites movies');
  db.connection.query("SELECT * FROM movies JOIN favorites ON favorites.movieID = movies.id WHERE userID = ?", [userID], function(err,rows) {
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


exports.updateURL = function (url, userID, done) {
  console.log('Updating url to ' + url);
  db.connection.query("UPDATE users SET url = ? WHERE id = ?", [url, userID], function(err,rows) {
    if (err) {
      done(err, null);
    }
    done(null, 'ok');
  });
};

exports.favoriteByCriteria = function (userID, properties, done) {
  for (var i = 0; i < properties.length; i++) {
    let criteria = properties[i];
    console.log('User ' + userID + 'wants to see recommandation based on ' + criteria);
    db.connection.query("select * from movies" +
    " JOIN favorites on favorites.movieID = movies.id" +
    " where userID = ?", [userID],function(err, rowsFavorites) {
      db.connection.query("SELECT COUNT("+criteria+") AS " + criteria + ", movies." + criteria + " FROM movies" +
      " JOIN favorites ON favorites.movieID = movies.id" +
      " WHERE userID = ?" +
      " GROUP BY " + criteria, [userID] ,function(err,rows) {
        if (err) {
          console.log(err);
        }
        if (rows.length) {
          console.log(rows.length + " " + criteria +" "+ rows[0][criteria]);
          db.connection.query("SELECT * FROM movies"+
          " WHERE " + criteria + " = '" + rows[0][criteria] + "' LIMIT 10",
          function(err,rowsfinals) {
            if (done !== null) {
              if (rowsfinals.length) {
                let description = new Object();
                description.field = "Based on your taste in/about " + criteria + "(" + rows[0][criteria] + "), these movies may interest you!"
                let movies = new Object();
                movies.list = rowsfinals;
                let obj = new Object();
                Object.assign(obj, movies, description);
                done(null, JSON.stringify(obj));
                done = null;
              } else {
                done('User does not have favorites', null);
                done = null;
              }
            };
          });
        } else {
          console.log('User does not have favorites based on ' + criteria);
        };
      });
    });
  }
};

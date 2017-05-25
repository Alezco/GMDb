const db = require('./db.js');


    exports.registerUser = function (login, password, done) {
      console.log('Registering new user ' + login);
      db.connection.query("select * from users where login = '"+login+"'", function(err,rows){
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
            var insertQuery = "INSERT INTO users ( login, password ) values ('" + login +"','"+ password +"')";
            console.log(insertQuery);
            db.connection.query(insertQuery,function(err,rows){
              newUserMysql.id = rows.insertId;
              console.log("all good");
              newUser = newUserMysql;
              done(null, newUser);
            });
          }
        });
    };
    exports.logUser = function (login, password, done) {
      console.log('LogIn user ' + login);
      db.connection.query("select * from users where login = '"+login+"'", function(err,rows){
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
            var insertQuery = "INSERT INTO users ( login, password ) values ('" + login +"','"+ password +"')";
            console.log(insertQuery);
            db.connection.query(insertQuery,function(err,rows){
              newUserMysql.id = rows.insertId;
              console.log("all good");
              newUser = newUserMysql;
              done(null, newUser);
            });
          }
        });
    };

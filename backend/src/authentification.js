const db = require('./db.js');


    exports.registerUser = function (login, password, done) {
      console.log('Registering new user ' + login);
      db.connection.query("select * from user where login = '"+login+"'", function(err,rows){
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
            var insertQuery = "INSERT INTO user ( login, password ) values ('" + login +"','"+ password +"')";
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
      db.connection.query("SELECT * FROM user WHERE login = '" + login + "'", function(err,rows){
    			if (err) {
            return done(err, null);
          }
    			if (!rows.length) {
            return done('No user matching', null);
          }
          if (!( rows[0].password == password)) {
            return done('Password mismatch', null);
          }
          console.log('All good');
          return done(null, rows[0]);
    		});
    };

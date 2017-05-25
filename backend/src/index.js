
// index.js
const express           = require('express');
const bodyParser        = require('body-parser');
const minify            = require('express-minify');
const mysql             = require('mysql');
const session           = require('express-session');

const app = express();

// DODGE CROS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(minify());
app.use(express.static("."));
app.use(bodyParser.json())


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'shhhhh'}));



// IMPORTS
const db = require('./db.js');
const auth = require('./authentification');
const public = require('./public');
const user = require('./user');

// SESSION USER
var sess;


app.get('/', function(req, res) {
    // the user was found and is available in req.user
    sess = req.session;
    if(sess.email) {
      res.send('OK is authentificated');
    } else {
      res.send('NO not authentificated');
    }
});


/**
 * @api {post} /api/signIn Create a new account
 * @apiName SignIn
 * @apiGroup Authentification
 *
 * @apiParam {string} login
 * @apiParam {string} password
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          login : hadrien
 *          password : iLoveJS
 *          id : 3
 *     }
 *
 * @apiError Error reason Could not create user
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Error
 *     {
 *       "error": "reason"
 *     }
 */
app.post('/api/signIn', (req, res) => {
    var newUser = auth.registerUser(req.body.login, req.body.pwd, function(err, user) {
      if (err) {
        console.log(err);
        res.statusCode = 403;
        res.send('{ error : '+err+'}');
      }
      console.log(user);
      if (user) {
        res.statusCode = 200;
        res.send(JSON.stringify(user));
      }
    });
});


/**
 * @api {post} /api/logIn log into account
 * @apiName logIn
 * @apiGroup Authentification
 *
 * @apiParam {string} login
 * @apiParam {string} password
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          login : hadrien
 *          password : iLoveJS
 *          id : 3
 *     }
 *
 * @apiError Error reason Could log user in
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Error
 *     {
 *       "error": "reason"
 *     }
 */
app.post('/api/logIn', (req, res) => {
  if (!req.body.login || !req.body.pwd) {
    res.statusCode = 403;
    res.send('{ error : Credential can not be empty ! }');
  } else {
    var newUser = auth.logUser(req.body.login, req.body.pwd, function(err, user) {
      if (err) {
        console.log(err);
        res.statusCode = 403;
        res.send('{ error : '+err+'}');
      }
      console.log(user);
      if (user) {
        sess = req.session;
        sess.email=req.body.login;
        res.statusCode = 200;
        res.send(JSON.stringify(user));
      }
    });
  }
});




/**
 * @api {post} /api/like add image to favorites
 * @apiName like
 * @apiGroup User
 *
 * @apiParam {string} movieID
 * @apiParam {string} userID
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          res : true
 *     }
 *
 * @apiError Error reason could not add to favorites
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Error
 *     {
 *       "error": "reason"
 *     }
 */
app.post('/api/like', (req, res) => {
  if (!req.body.movieID || !req.body.userID) {
    res.statusCode = 400;
    res.send('{ error : No film provided }');
  } else {
    sess = req.session;
    var newUser = user.likeMovie(req.body.movieID, req.body.userID, function(err, isOk) {
      if (err) {
        console.log(err);
        res.statusCode = 400;
        res.send('{ error : '+err+'}');
      }
      console.log(isOk);
      if (isOk) {
        res.statusCode = 200;
        res.send(JSON.stringify('{ res : true}'));
      }
    });
  }
});

/**
 * @api {get} /api/favorites/:id getUserFavorites
 * @apiName user fvorites
 * @apiGroup User
 *
 * @apiParam {int} id the id of the user
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          // movie object list
 *     }
 *
 * @apiError Error reason could get favorites movies
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Error
 *     {
 *       "error": "reason"
 *     }
 */
app.get('/api/favorites/:id', (req, res) => {
  if (!req.params.id) {
    res.statusCode = 400;
    res.send('{ error : No film provided }');
  } else {
    sess = req.session;
    var newUser = user.myMovies(req.params.id, function(err, movies) {
      if (err) {
        console.log(err);
        res.statusCode = 400;
        res.send('{ error : '+err+'}');
      } else {
      console.log(movies);
      if (movies) {
        res.statusCode = 200;
        res.send(movies);
      }
    }
    });
  }
});


/**
 * @api {get} /api/films Get film list
 * @apiName GetFilms
 * @apiGroup Movies
 *
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          [
 *            {
 *              "id": 1,
 *              "Title": "2012",
 *              "Year": 2009,
 *              "Rated": "PG-13",
 *              "Released": "13 Nov 2009",
 *              "Runtime": "158 min",
 *              "Genre": "Action, Adventure, Sci-Fi",
 *              "Director": "Roland Emmerich",
 *              "Writer": "Roland Emmerich, Harald Kloser",
 *              "Actors": "John Cusack, Amanda Peet, Chiwetel Ejiofor, Thandie Newton",
 *              "Plot": "A frustrated writer struggles to keep his family alive when a series of global catastrophes threatens to annihilate mankind.",
 *              "Language": "English, French, Tibetan, Mandarin, Russian, Hindi, Portuguese, Latin, Italian",
 *              "Country": "USA",
 *              "Awards": "5 wins & 20 nominations.",
 *              "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY0MjEyODQzMF5BMl5BanBnXkFtZTcwMTczMjQ4Mg@@._V1_SX300.jpg",
 *              "Metascore": 49,
 *              "imdbRating": "5.8",
 *              "imdbVotes": "297,440",
 *              "BoxOffice": "$166,112,167"
 *            },
 *            {
 *              "id": 2,
 *              "Title": "47 Ronin",
 *              "Year": 2013,
 *              "Rated": "PG-13",
 *              "Released": "25 Dec 2013",
 *              "Runtime": "128 min",
 *              "Genre": "Action, Adventure, Drama",
 *              "Director": "Carl Rinsch",
 *              "Writer": "Chris Morgan (screenplay), Hossein Amini (screenplay), Chris Morgan (screen story by), Walter Hamada (screen story by)",
 *              "Actors": "Keanu Reeves, Hiroyuki Sanada, Ko Shibasaki, Tadanobu Asano",
 *              "Plot": "A band of samurai set out to avenge the death and dishonor of their master at the hands of a ruthless shogun.",
 *              "Language": "English, Japanese",
 *              "Country": "USA",
 *              "Awards": "5 nominations.",
 *                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0MjE2NzE0OV5BMl5BanBnXkFtZTgwNTU5MjE1MDE@._V1_SX300.jpg",
 *              "Metascore": 28,
 *                "imdbRating": "6.3",
 *                "imdbVotes": "123,023",
 *                "BoxOffice": "$20,518,224"
 *              }
 *            ]
 *     }
 *
 * @apiError Error reason Could not fetch films
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Error
 *     {
 *       "error": "reason"
 *     }
 */
app.get('/api/films', (req, res) => {
    var newUser = public.getFilms(function(err, movies) {
      if (err) {
        console.log(err);
        res.statusCode = 501;
        res.send('{ error : '+err+'}');
      }
      console.log(movies);
      if (movies) {
        res.statusCode = 200;
        res.send(movies);
      }
    });
});

// start your server
app.listen(4242, () => {
  console.log('GMBD server listening on port 4242!');
});

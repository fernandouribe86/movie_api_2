//STEP 1: LOAD EXPRESS FRAMEWORK
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

const cors = require('cors');

const {check, validationResult } = require('express-validator');

let allowedOrigins = ['http://localhost:8080', 'http://fernandouribe.com', 'http://localhost:1234', 'https://steady-raindrop-99ccc8.netlify.app', 'http://localhost:62974','http://localhost:4200', 'https://myflix-angular.netlify.app'];

app.use(cors( {
	origin: (origin, callback) => {
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1 ){
			let message = "The CORS policy for this application doesn't allow access from origin "+ origin;
			return callback(new Error(message), false);
		}
		return callback(null, true);
	}
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import auth.js file
let auth = require('./auth')(app);

// import passport.js file
const passport = require('passport');
  require('./passport');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

// mongoose.connect('mongodb://localhost:27017/myFlixdb')
mongoose.connect(  process.env.CONNECTION_URI, {useNewUrlParser: true });

const { urlencoded } = require('express');

const res = require('express/lib/response');

//USE MORGAN MIDDLEWARE LIBRARY
const morgan = require('morgan');
app.use(morgan('common'));

/* *** START OF ENPOINT DEFINITION
* *****
* */

/**
 * GET: Welcome message
 */ 
app.get("/", (req, res) => {
	res.send("Welcome to myFlix");
   });

/**
 * GET: Returns a list of ALL movies to the user
 * Request body: Bearer token
 * @returns array of movie objects
 * @requires passport
 */


app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
	Movies.find()
	  .then((movies) => {
	    res.status(201).json(movies);
	  })
	  .catch((error) => {
	    console.error(error);
	    res.status(500).send('Error: ' + error);
	  });
   });



/**
 * GET: Returns a single movie to the user by Title
 * Request body: Bearer token
 * @returns movie object
 * @requires passport
 */

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
	Movies.findOne({ Title: req.params.Title})
		.then((movie) => {
			res.json(movie);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

/**
 * GET: Returns a list of ALL genres to the user
 * Request body: Bearer token
 * @returns array of genres objects
 * @requires passport
 */

app.get('/genres'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Genres.find()
		.then ((genres) => {
			res.status(201).json(genres);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

/**
 * GET: Returns a single genre's details to the user based on the name of the Genre
 *  @param genre name
 * @returns single genre object
 * @requires passport
 */

app.get('/genres/:Name'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Genres.findOne({ Name: req.params.Name})
		.then((genre) => {
			res.json(genre);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});



/**
 * GET: Returns a list of ALL directors to the user
 * Request body: Bearer token
 * @returns array of directors objects
 * @requires passport
 */

app.get('/directors'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Directors.find()
		.then ((directors) => {
			res.status(201).json(directors);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

/**
 * GET: Returns a single director's details to the user based on the name of the director
 * Request body: Bearer token
 * @param director's name
 * @returns single director object
 * @requires passport
 */

app.get('/directors/:Name'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Directors.findOne({ Name: req.params.Name })
		.then((director) => {
			res.json(director);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

/** POST: Allow a new user to register
 * Request body:
 * { 
	* Username: String, (required)
	* Password: password, (required)
	* Email: string, (required)
	* Birthday: Date
 * }
 * @return
 * { 
	* _id: string,
	* Username: String,
	* Password: hashedPassword,
	* Email: string,
	* Birthday: Date,
	* Favorites: Array,
 * }
 * @returns bearer token
 * */
app.post('/users', 
[
	check('Username', 'Username is required').isLength({min: 5}),
	check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
	check('Password', 'Password is required').not().isEmpty(),
	check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
	console.log(req.body)
	let errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	let hashedPassword = Users.hashPassword(req.body.Password);
	Users.findOne({Username: req.body.Username})
		.then((user) => {
			if (user) {
			return res.status(400).send(req.body.Username + 'already exists');
		} else {
			Users
				.create({
					Username: req.body.Username,
					Password: hashedPassword,
					Email: req.body.Email,
					Birthday: req.body.Birthday
				})
				.then((user) => { res.status(201).json(user)})
			.catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			})
		}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});


/**
 * GET: get user info by username
 * Request body: Bearer token
 * @param username
 * @returns single user object
 * @requires passport
 */

app.get('/users/:Username', (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
}); 

/** * PUT: Allow an existing user to update their information
 * Request body:
 * * { 
	* Username: String, 
	* Password: password, (required)
	* Email: string, 
	* Birthday: Date
 * }
 * @return
* { 
	* _id: string,
	* Username: String,
	* Password: hashedPassword,
	* Email: string,
	* Birthday: Date,
	* Favorites: Array,
 * }
 * @returns bearer token
 * */

app.put('/users/:Username'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	let hashedPassword = Users.hashPassword(req.body.Password);
	Users.findOneAndUpdate({ Username: req.params.Username}, { $set:
		{
			Username: req.body.Username,
			Password: hashedPassword,
			Email: req.body.Email,
			Birthday: req.body.Birthday
		}
	},
	{ new: true },
		(err, updatedUser) => {
			if(err) {
				console.error(err);
				res.status(500).send('Error: '+ err);
			} else {
				res.json(updatedUser);
			}
		});
});

/** * POST: Allow a user to add movie to favorites list
 * @param username
 * Request body:
 * * { 
	* _id
 * }
 * @returns success message / error
 * */

app.post( '/users/:Username/movies/:MovieID'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Users.findOneAndUpdate({ Username: req.params.Username}, {
		$push: { Favorites: req.params.MovieID }
	},
	{ new: true },
	(err, updatedUser) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error: '+ err);
		} else{
			res.json(updatedUser);
		}
	});
});

/** * DELETE: Allow a user to remove movie to favorites list
 * @param username
 * Request body:
 * * { 
	* _id: string
 * }
 * @returns success message / error
 * */
app.delete( '/users/:Username/movies/:MovieID'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Users.findOneAndUpdate({ Username: req.params.Username}, {
		$pull: { Favorites: req.params.MovieID }
	},
	{ new: true },
	(err, updatedUser) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error: '+ err);
		} else{
			res.json(updatedUser);
		}
	});
});

/** * DELETE: Allow a user to delete their account
 * @param username
 * Request body:
 * * { 
	* username: string
 * }
 * @returns success message / error
 * */
app.delete('/users/:Username'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
	Users.findOneAndRemove({ Username: req.params.Username})
	.then((user) => {
		if(!user) {
			res.status(400).send(req.params.Username + ' was not found');
		} else {
			res.status(200).send(req.params.Username + ' was deleted.');
		}
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: '+ err);
	});
});

/**
 * GET: get user favorites by username
 * Request body: Bearer token
 * @param username
 * @returns single user object
 * @requires passport
 */

app.get('/users/:Username/Favorites', (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
}); 

//USE EXPRESS STATIC CONTENT FROM THE PUBLIC DIR
app.use(express.static('public'));

//ERROR HANDLING
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something is not right!');
   });

// LISTEN TO PORT 8080
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
	console.log('Listening on Port ' + port);
});

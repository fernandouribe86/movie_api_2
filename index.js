//STEP 1: LOAD EXPRESS FRAMEWORK
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect('mongodb://localhost:27017/myFlixdb')

const { urlencoded } = require('express');
const res = require('express/lib/response');

//USE MORGAN MIDDLEWARE LIBRARY
const morgan = require('morgan');
app.use(morgan('common'));

//GET WELCOME MESSAGE 
app.get('/', (req, res) => {
	res.send('Welcome to my favorite movies app!');
});

// 1. Get a list of ALL movies to the user
app.get('/movies', (req, res) => {
	Movies.find()
		.then ((movies) => {
			res.status(201).json(movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

// 2. Get data about a single movie by the title to the user
app.get('/movies/:Title', (req, res) => {
	Movies.findOne({ Title: req.params.Title})
		.then((movie) => {
			res.json(movie);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// Get a list of ALL Genres to the user
app.get('/genres', (req, res) => {
	Genres.find()
		.then ((genres) => {
			res.status(201).json(genres);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

// 3. Return data about a genre by name/title
app.get('/genres/:Name', (req, res) => {
	Genres.findOne({ Name: req.params.Name})
		.then((genre) => {
			res.json(genre);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// Get a list of ALL Directors to the user
app.get('/directors', (req, res) => {
	Directors.find()
		.then ((directors) => {
			res.status(201).json(directors);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

// 4. Return data about a director by Name
app.get('/directors/:Name', (req, res) => {
	Directors.findOne({ Name: req.params.Name })
		.then((director) => {
			res.json(director);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// Get list of all users
app.get('/users', (req, res) => {
	Users.find()
		.then ((users) => {
			res.status(201).json(users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: '+ err);
		});
});

// Get user info by Username
app.get('/users/:Username', (req, res) => {
	Directors.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// 5. Allow a new user to register
/* We'll expect a JSON in this format:
{ 
	ID: Integer,
	Username: String,
	Password: String,
	Birthday: Date
}*/
app.post('/users', (req, res) => {
	Users.findOne({Username: req.body.Username})
		.then((user) => {
			if (user) {
			return res.status(400).send(req.body.Username + 'already exists');
		} else {
			Users
				.create({
					Username: req.body.Username,
					Password: req.body.Password,
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


// Get user info by Username
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

// 6. Allow users to update their user info
/* We'll expect JSON in this format: 
{
	Username: String,
	(required)
	Password: String,
	(required)
	Email: String,
	(required)
	Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
	Users.findOneAndUpdate({ Username: req.params.Username}, { $set:
		{
			Username: req.body.Username,
			Password: req.body.Password,
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

// 7. Allow users to add a movie to their list of favorites
app.post( '/users/:Username/movies/:MovieID', (req, res) => {
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

// 8. Allow users to remove a movie from their list of favorites
app.delete( '/users/:Username/movies/:MovieID', (req, res) => {
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

// 9. Allow existing users to de-register
app.delete('/users/:Username', (req, res) => {
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

//USE EXPRESS STATIC CONTENT FROM THE PUBLIC DIR
app.use(express.static('public'));

//ERROR HANDLING
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something is not right!');
   });

// LISTEN TO PORT 8080
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});

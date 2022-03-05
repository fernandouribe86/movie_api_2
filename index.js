//STEP 1: LOAD EXPRESS FRAMEWORK
const express = require('express'),
	app = express();

const { urlencoded } = require('express');
const res = require('express/lib/response');

//USE MORGAN MIDDLEWARE LIBRARY
const morgan = require('morgan');
app.use(morgan('common'));

// ARRAY OF TOP MOVIES
let movies = [
	{
		ID: "M10",
		title: 'Star Wars Episode IV: A New Hope',
		movieYear: 1977,
		directors: [
			{
			directorID: "D10",
			directorName: "George Lucas",
			directorData: {
				directorBio: "George Walton Lucas, Jr. was raised on a walnut ranch in Modesto, California. His father was a stationery store owner and he had three siblings.",
				directorYOB: 1944,
				directorYOD: "",
				directorPhoto: "assets/george_lucas.jpg",
				}
			}
		],
		movieDescription: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
		movieGenres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
		movieImage: "assets/sw.jpg",
		featured: true,
	},

	{
		ID: "M20",
		title: 'INSIDE',
		movieYear: 2021,
		directors: [
			{
			directorID: "D20",
			directorName: "Bo Burnham",
			directorData: {
				directorBio: "Robert Pickering Burnham is an American actor, director, writer and producer. He is known for writing and directing the middle school comedy film Eighth Grade. He also acted in Funny People, Rough Night, American Virgin, Hall Pass, The Big Sick and Promising Young Woman.",
				directorYOB: 1990,
				directorYOD: "",
				directorPhoto: "assets/bo_burnham.jpg",
				}
			}
		],
		movieDescription: "A musical comedy special shot and performed by Bo Burnham, alone, over the course of a very unusual year.",
		movieGenres: ["Comedy", "Drama", "Music"],
		movieImage: "assets/bo.jpg",
		featured: true
	},

	{
		ID: "M30",
		title: 'SKYFALL',
		movieYear: 2012,
		directors: [
			{
			directorID: "D30",
			directorName: "Sam Mendes",
			directorData: {
				directorBio: "Samuel Alexander Mendes was born on August 1, 1965 in Reading, England, UK to parents James Peter Mendes, a retired university lecturer, and Valerie Helene Mendes, an author who writes children's books.",
				directorYOB: 1965,
				directorYOD: "",
				directorPhoto: "assets/sam_mendes.jpg",
				}
			}
		],
		movieDescription: "James Bond's loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.",
		movieGenres: ["Action", "Adventure", "Thriller"],
		movieImage: "assets/sky.jpg",
		featured: true
	},

	{
		ID: "M40",
		title: 'Star Wars: Episode V - The Empire Strikes Back',
		movieYear: 1980,
		directors: [
			{
			directorID: "D40",
			directorName: "Irvin Kershner",
			directorData: {
				directorBio: "Irvin Kershner was born on April 29, 1923 in Philadelphia, Pennsylvania. A graduate of the University of Southern California film school, Kershner began his career in 1950, producing documentaries for the United States Information Service in the Middle East. He later turned to television, directing and photographing a series of documentaries.",
				directorYOB: 1923,
				directorYOD: 2010,
				directorPhoto: "assets/irvin_kershner.jpg",
				}
			}
		],
		movieDescription: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
		movieGenres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
		movieImage: "assets/emp.jpg",
		featured: true
	},

	{
		ID: "M50",
		title: 'Back to the Future',
		movieYear: 1985,
		directors: [
			{
			directorID: "D50",
			directorName: "Robert Zemeckis",
			directorData: {
				directorBio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)).",
				directorYOB: 1951,
				directorYOD: "",
				directorPhoto: "assets/robert_zemeckis.jpg",
				}
			}
		],
		movieDescription: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
		movieGenres: ["Adventure", "Comedy", "Sci-Fi"],
		movieImage: "assets/bttf.jpg",
		featured: true
	},

	{
		ID: "M60",
		title: 'COCO',
		movieYear: 2017,
		directors: [
			{
			directorID: "D60",
			directorName: "Lee Unkrich",
			directorData: {
				directorBio: "Lee Unkrich is an Academy Award-winning director at Pixar Animation Studios. He most recently directed Disney.Pixar's critically-acclaimed 'Coco', which received the Academy Award for Best Animated Feature and Best Song.",
				directorYOB: 1967,
				directorYOD: "",
				directorPhoto: "assets/lee_unkrich.jpg",
				}
			},
			{
			directorID: "D61",
			directorName: "Adrian Molina",
			directorData: {
				directorBio: "Adrian Molina is known for his work on Coco (2017), The Good Dinosaur (2015) and Ratatouille (2007).",
				directorYOB: 1985,
				directorYOD: "",
				directorPhoto: "assets/adrian_molina.jpg",
				}	
			}
		],
		movieDescription: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
		movieGenres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Music", "Mystery"],
		movieImage: "assets/coco.jpg",
		featured: true
	},

	{
		ID: "M70",
		title: 'Spider-Man: Into the Spider-Verse',
		movieYear: 2018,
		directors: [
			{
			directorID: "D70",
			directorName: "Bob Persichetti",
			directorData: {
				directorBio: "Bob Persichetti is a director and writer, known for Spider-Man: Into the Spider-Verse (2018), The Little Prince (2015) and Puss in Boots (2011). ",
				directorYOB: "",
				directorYOD: "",
				directorPhoto: "assets/bob_persichetti.jpg",
				}
			},
		{
			directorID: "D71",
			directorName: "Peter Ramsey",
			directorData: {
				directorBio: "Peter Ramsey is the director of Dreamworks Animation's 2012 feature film 'Rise Of The Guardians'. He also directed the Halloween TV special, 'Monsters vs. Aliens: Mutant Pumpkins from Outer Space' as well as serving as a story artist on several of Dreamworks Animation's feature films.",
				directorYOB: 1962,
				directorYOD: "",
				directorPhoto: "assets/peter_ramsey.jpeg",
				}
			},
			{
			directorID: "D72",
			directorName: "Rodney Rothman",
			directorData: {
				directorBio: "Rodney Rothman is a writer and producer, known for Spider-Man: Into the Spider-Verse (2018), 22 Jump Street (2014) and Forgetting Sarah Marshall (2008).",
				directorYOB: "",
				directorYOD: "",
				directorPhoto: "assets/rodney_rothman.jpg",
				}	
			}
		],
		movieDescription: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
		movieGenres: ["Animation", "Action", "Adventure", "Comedy", "Family", "Fantasy", "Sci-Fi"],
		movieImage: "assets/sv.jpg",
		featured: true
	},

	{
		ID: "M80",
		title: 'Avengers: Endgame',
		movieYear: 2019,
		directors: [
			{
			directorID: "D80",
			directorName: "Anthony Russo",
			directorData: {
				directorBio: "Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo. They have directed You, Me and Dupree, Cherry and the Marvel films Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War and Avengers: Endgame. Endgame is one of the highest grossing films of all time.",
				directorYOB: 1970,
				directorYOD: "",
				directorPhoto: "assets/anthony_russo.jpg",
				}
			},
			{
			directorID: "D81",
			directorName: "Joe Russo",
			directorData: {
				directorBio: "Joseph Vincent Russo is an American filmmaker and producer who works alongside his brother Anthony Russo. They have directed You, Me and Dupree, Cherry and the Marvel films Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War and Avengers: Endgame. Endgame is one of the highest grossing films of all time.",
				directorYOB: 1971,
				directorYOD: "",
				directorPhoto: "assets/joe_russo.jpg",
				}	
			}
		],
		movieDescription: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
		movieGenres: ["Action", "Adventure", "Drama", "Sci-Fi"],
		movieImage: "assets/eg.jpg",
		featured: true
	},

	{
		ID: "M90",
		title: 'Inglorious Basterds',
		movieYear: 2009,
		directors: [
			{
			directorID: "D90",
			directorName: "Quentin Tarantino",
			directorData: {
				directorBio: "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.",
				directorYOB: 1963,
				directorYOD: "",
				directorPhoto: "assets/quentin_tarantino.jpg",
				}
			}
		],
		movieDescription: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
		movieGenres: ["Adventure", "Drama", "War"],
		movieImage: "assets/ig.jpg",
		featured: true,
	},

	{
		ID: "M100",
		title: 'Up',
		movieYear: 2009,
		directors: [
			{
			directorID: "D100",
			directorName: "Pete Docter",
			directorData: {
				directorBio: "Pete Docter is the Oscar®-winning director of 'Monsters, Inc.,' 'Up,' and 'Inside Out,' and Chief Creative Officer at Pixar Animation Studios.",
				directorYOB: 1968,
				directorYOD: "",
				directorPhoto: "assets/pete_docter.jpg",
				}
			},
			{
			directorID: "D101",
			directorName: "Bob Peterson",
			directorData: {
				directorBio: "Bob Peterson was born in Wooster, Ohio, USA, in 1961. He studied mechanical engineering at Ohio Northern University, where he took computer graphics courses and graduated in 1983. He continued his studies in mechanical engineering at Purdue University where he earned a master's degree in 1986.",
				directorYOB: 1961,
				directorYOD: "",
				directorPhoto: "assets/bob_peterson.jpg",
				}	
			}
		],
		movieDescription: "As a boy, Carl Fredricksen wanted to explore South America and find the forbidden Paradise Falls. About 64 years later he gets to begin his journey along with Boy Scout Russell by lifting his house with thousands of balloons. On their journey, they make many new friends including a talking dog, and figure out that someone has evil plans. Carl soon realizes that this evildoer is his childhood idol.",
		movieGenres: ["Animation", "Adventure", "Comedy", "Drama", "Family"],
		movieImage: "assets/up.jpg",
		featured: true,
	},
];

let genres = [
	{
		genre: "Animation",
		genreDescription: "The animation genre is defined by inanimate objects being manipulated to appear as though they are living."
	},
	{
		genre: "Action",
		genreDescription: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
	},
	{
		genre: "Adventure",
		genreDescription: "Movies in the adventure genre are defined by a journey, often including some form of pursuit, and can take place in any setting."
	},
	{
		genre: "Comedy",
		genreDescription: "The comedy genre is defined by events that are intended to make someone laugh, no matter if the story is macabre, droll, or zany."
	},
	{
		genre: "Drama",
		genreDescription: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences."
	},
	{
		genre: "Family",
		genreDescription: "Movies in the family genre can be enjoyed by a wide variety of age ranges, both due to the appropiotness of the content or the child-friendly plots, characters, and mechanics."
	},
	{
		genre: "Fantasy",
		genreDescription: "The fantasy genre is defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws. The possibilities of fantasy are nearly endless, but the movies will often be inspired by or incorporate human myths."
	},
	{
		genre: "Music",
		genreDescription: "Musicals originated as stage plays, but they soon became a favorite for many film directors and have even made their way into television. Musicals can incorporate any other genre, but they incorporate characters who sing songs and perform dance numbers."
	},
	{
		genre: "Mystery",
		genreDescription: "A mystery story can often be connected to the crime genre, but may not involve or use law enforcement or the justice system as the main characters or backdrop for the story."
	},
	{
		genre: "Sci-Fi",
		genreDescription: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science."
	},
	{
		genre: "Thriller",
		genreDescription: "A thriller story is mostly about the emotional purpose, which is to elicit strong emotions, mostly dealing with generating suspense and anxiety."
	},
	{
		genre: "War",
		genreDescription: "A military science fiction story is defined by a strict focus on the military conflict in a speculative or future setting. While other movies may include space warfare, a military science fiction story will be limited to themes and events directly tied to military service and battle."
	},
]

//STEP 2: GET MOVIES IN JSON FOR '/movies' URL REQUEST
app.get('/movies', (req, res) => {
	res.json(movies);
});

//GET WELCOME MESSAGE 
app.get('/', (req, res) => {
	res.send('Welcome to my favorite movies app!');
});

//Get the data about a single movie by name
app.get('/movies/:title/', (req, res) => {
	res.json(movies.find((movie) =>
	{return movie.title === req.params.title }));
});

//Get the director(s) about a single movie by name
app.get('/movies/:title/directors', (req, res) => {
	res.json(movies.find((movie) =>
	{return movie.title === req.params.title }).directors);

	// let movie = movies.find((movie) =>
	// {return movie.title === req.params.title });

	// let director = movie.directors.find((director) =>
	// director.directorName === director);
	// res.json(director);
});

//Get the genre(s) about a single movie by name
app.get('/movies/:title/movieGenres', (req, res) => {
	let movie = movies.find((movie) =>
	{return movie.title === req.params.title });
	
	const mGenres = movie.movieGenres;

	genres.forEach(genre => {
		if (mGenres.includes(genre.genre)){
			res.json(genre.genreDescription);
		} else{res.json("")}
	}
)});

//Get movie description
app.get('/movies/:title/movieDescription', (req, res) => {
	res.json(movies.find((movie) =>
	{return movie.title === req.params.title }).movieDescription);
});

//Get movie image
app.get('/movies/:title/movieImage', (req, res) => {
	res.json(movies.find((movie) =>
	{return movie.title === req.params.title }).movieImage);
});

//Get movie featured boolean
app.get('/movies/:title/featured', (req, res) => {
	res.json(movies.find((movie) =>
	{return movie.title === req.params.title }).featured);
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

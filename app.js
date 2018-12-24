var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* const cheerio = require('cheerio'); */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * Controllers (route handlers).
 */
  const celebController = require('./controllers/celebs');
  const movieController = require('./controllers/movies');
  const showtimeController = require('./controllers/showTimes');
  const tvShowsController = require('./controllers/tvShows');
  const userController = require('./controllers/users');
  const episodeController = require('./controllers/episodes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/imdb')
/*mongoose.connect(process.env.MONGODB_URL);*/
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"));

app.post('/api/v1/users', userController.postNewUser);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUserById);
app.delete('/api/v1/users/:id', userController.deleteUserById);

app.post('/api/v1/movies', movieController.postNewMovie);
app.get('/api/v1/movies', movieController.getAllMovies);
app.get('/api/v1/movies/:id', movieController.getMovieById);
app.put('/api/v1/movies/:id', movieController.updateMovieById);
app.delete('/api/v1/movies/:id', movieController.deleteMovieById);

app.post('/api/v1/tv', tvShowsController.postNewTv);
app.get('/api/v1/tv', tvShowsController.getAllTv);
app.get('/api/v1/tv/:id',tvShowsController.getTvById);
app.put('/api/v1/tv/:id', tvShowsController.updateTvById);
app.delete('/api/v1/tv/:id', tvShowsController.deleteTvById);

app.post('/api/v1/celebs', celebController.postNewCeleb);
app.get('/api/v1/celebs', celebController.getAllCelebs);
app.get('/api/v1/celebs/:id', celebController.getCelebById);
app.put('/api/v1/celebs/:id', celebController.updateCelebById);
app.delete('/api/v1/celebs/:id', celebController.deleteCelebById);

app.post('/api/v1/episodes', episodeController.postNewEpisode);
app.get('/api/v1/episodes', episodeController.getAllEpisodes);
app.get('/api/v1/episodes/:id', episodeController.getEpisodeById);
app.put('/api/v1/episodes/:id', episodeController.updateEpisodeById);
app.delete('/api/v1/episodes/:id', episodeController.deleteEpisodeById);

app.post('/api/v1/showtimes', showtimeController.postNewShowtime);
app.get('/api/v1/showtimes', showtimeController.getAllShowtimes);
app.get('/api/v1/showtimes/:id', showtimeController.getShowtimeById);
app.put('/api/v1/showtimes/:id', showtimeController.updateShowtimeById);
app.delete('/api/v1/showtimes/:id', showtimeController.deleteShowtimeById);

// app.get('/crawl', function (req, res) {
//   const rp = require('request-promise');
//   const $ = require('cheerio');
//   const url = 'https://en.wikipedia.org/wiki/Indian_Premier_League';

//   rp(url)
//     .then(function (html) {
//       console.log(html)
//       var data = $('table.wikitable td a', html)
//       res.json({
//         team: data[0].children[0].data,
//         link: data[0].attribs.href,
//         city: [
//           data[1].children[0].data,
//           data[2].children[0].data,
//         ],
//         homeground: [
//           data[3].children[0].data,
//           data[4].children[0].data,
//         ],
//         debut: data[5].children[0].data

//       })
//     })
//     .catch(function (err) {
//       res.send(err);
//   })
// });


module.exports = app;
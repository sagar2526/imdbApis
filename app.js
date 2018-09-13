var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * Controllers (route handlers).
 */
  const celebController = require('./controllers/celebs');
  const movieController = require('./controllers/movies');
  //const showtimeController = require('./controllers/showtimes');
  const tvShowsController = require('./controllers/tvShows');
  const userController = require('./controllers/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGODB_URL);
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


module.exports = app;
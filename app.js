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
  const showtimeController = require('./controllers/showtimes');
  const tvController = require('./controllers/tv');
  const photoController = require('./controllers/photos');
  const userController = require('./controllers/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/imdb');
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

app.post('/api/v1/tv', tvController.postNewTv);
app.get('/api/v1/tv', tvController.getAllTv);
app.get('/api/v1/tv/:id', tvController.getTvById);
app.put('/api/v1/tv/:id', tvController.updateTvById);
app.delete('/api/v1/tv/:id', tvController.deleteTvById);

app.post('/api/v1/celebs', celebController.postNewCeleb);
app.get('/api/v1/celebs', celebController.getAllCelebs);
app.get('/api/v1/celebs/:id', celebController.getCelebById);
app.put('/api/v1/celebs/:id', celebController.updateCelebById);
app.delete('/api/v1/celebs/:id', celebController.deleteCelebById);

app.post('/api/v1/photos', photoController.postNewPhoto);
app.get('/api/v1/photos', photoController.getAllPhotos);
app.get('/api/v1/photos/:id', photoController.getPhotoById);
app.put('/api/v1/photos/:id', photoController.updatepPhotoById);
app.delete('/api/v1/photos/:id', photoController.deletePhotoById);

module.exports = app;
app.listen(4040, () => console.log('Express server at 4040'));
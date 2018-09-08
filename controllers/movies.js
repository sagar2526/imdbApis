const Movie = require('../models/movies');

exports.postNewMovie = (req, res) => {
  let{
    poster,
    trailer,
    description,
    director,
    writer,
    stars,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt
  } = req.body;

  var movie = new Movie({
    poster,
    trailer,
    description,
    director,
    writer,
    stars,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt
  });
  movie.save().then((movie) => {
    console.log('Added successfully');
    res.json(movie);
  });
};

exports.getAllMovies = (req, res) => {
  Movie.find({}, (error, movies) => {
    if(error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (movies) {
      res.json({
        data: movies,
        message: "All movies fetched",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.getMovieById = (req, res) => {
  Movie.findById(req.params.id, (err, movies) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (movies) {
      res.json({
        data: movies,
        message: "User data fetched successfully",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.updateMovieById = (req, res) => {
  console.log(req.body);
  const {
    poster,
    trailer,
    description,
    director,
    writer,
    stars,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt
  } = req.body;
  Movie.update({
    _id: req.params.id
  }, {
    poster,
    trailer,
    description,
    director,
    writer,
    stars,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt
  }, {}, (error, movie) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(movie);
  });
};

exports.deleteMovieById = (req, res) => {
  Movie.findOneAndDelete({
    _id: req.params.id
  }, (error, deleteId) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    res.json({
      message: "Deleted successfully"
    });
  });
};
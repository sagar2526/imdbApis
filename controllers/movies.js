const Movie = require('../models/movies');

exports.postNewMovie = (req, res) => {
  let {
    title,
    posterUrl,
    trailerUrl,
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
    title,
    posterUrl,
    trailerUrl,
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
  movie.save().then((newMovie) => {
    console.log('Added successfully');
    res.json({
      message: `Added ${newMovie.title} successfully`,
      status: 200
      //message: 'Added'+ newMovie.title +'successfully'
    });
  }).catch(function (err) {
    if (err) {
      console.log(err)
      res.json({
        message: 'Server error',
        status: 500
      })
    }
  })
};
/**
 * 
 * // With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
 * 
 */
exports.getAllMovies = (req, res) => {
  var query = Movie.find()
  if (req.query.title) {
    query.where({ title: req.query.title })
  }
  query.select('title status -_id')
  query.limit(req.query.limit || 10)
  /**
   * 
      The cursor.skip() method is often expensive because it requires 
      the server to walk from the beginning of the collection or index 
      to get the offset or skip position before beginning to return 
      result. As offset (e.g. pageNumber above) increases, cursor.skip() 
      will become slower and more CPU intensive. 
      With larger collections, cursor.skip() may become IO bound.
      To achieve pagination in a scaleable way combine a limit( ) 
      along with at least one filter criterion, a createdOn date 
      suits many purposes.

      `MyModel.find( { createdOn: { $lte: request.createdOnBefore } } )
      .limit( 10 )
      .sort( '-createdOn' )`
   
      */
  query.exec((error, movies) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (movies) {
      res.json({
        data: movies,
        message: "All movies fetched",
        status: 200,
        pagination:{
          limit: req.query.limit || 10,
          page: 1
        }
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
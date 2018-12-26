const Tv = require('../models/tvShows');

exports.postNewTv = (req, res) => {
  if (
    req.body.title &&
    req.body.posterUrl &&
    req.body.trailerUrl &&
    req.body.description &&
    req.body.director &&
    req.body.writer &&
    req.body.stars &&
    req.body.episode &&
    req.body.photourl &&
    req.body.storyline &&
    req.body.keywords &&
    req.body.genres
  ) {
    let {
      title,
      posterUrl,
      trailerUrl,
      description,
      director,
      writer,
      stars,
      episode,
      photourl,
      storyline,
      keywords,
      genres,
      createdAt,
      modifiedAt
    } = req.body;

    var tv = new Tv({
      title,
      posterUrl,
      trailerUrl,
      description,
      director,
      writer,
      stars,
      episode,
      photourl,
      storyline,
      keywords,
      genres,
      createdAt,
      modifiedAt
    });
    Tv.save().then((tv) => {
      console.log('Added successfully');
      res.json({
        message: "tv show added succefully",
        ststus: 200
      });
    }).catch(function (err) {
      if (err) {
        console.log(err)
        res.json({
          message: 'Server error',
          status: 500
        })
      }
    });
  } else {
    res.json({
      message: 'Incomplete Inputs',
      status: 201
    });
  }
};

exports.getAllTv = (req, res) => {
  Tv.find({}, (error, tv) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (tv) {
      res.json({
        data: tv,
        message: "All Tvs fetched",
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

exports.getTvById = (req, res) => {
  Tv.findById(req.params.id, (err, tv) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (tv) {
      res.json({
        data: tv,
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

exports.updateTvById = (req, res) => {
  console.log(req.body);
  const {
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    writer,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
  } = req.body;
  Tv.update({
    _id: req.params.id
  }, {
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    writer,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt
  }, {}, (error, tv) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
      res.json({
        message: "tv show updated successfully",
        status: 200
    });
  });
};

exports.deleteTvById = (req, res) => {
  Tv.findOneAndDelete({
    _id: req.params.id
  }, (error, deleteId) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    res.json({
      message: "Deleted successfully",
      status: 200
    });
  })
}
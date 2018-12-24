const Episode = require('../models/episodes');

exports.postNewEpisode = (req, res) => {
  let {
    seriesName,
    title,
    posterUrl,
    season,
    description,
    director,
    stars,
    storyline,
    genres,
    createdAt,
    modifiedAt
  } = req.body;

  var episode = new Episode({
    seriesName,
    title,
    posterUrl,
    season,
    description,
    director,
    stars,
    storyline,
    genres,
    createdAt,
    modifiedAt
  });
  episode.save().then((newEpisode) => {
    console.log('Added successfully');
    res.json({
      message: 'Added ${newEpisode.title} successfully',
      status: 200
    });
  }).catch(function(err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
};

exports.getAllEpisodes = (req, res) => {
  var query = Episode.find();
  if (req.query.name) {
    query.where({ title: req.query.name });
  }
  query.select('name -_id');
  query.limit(req.query.limit || 10);
  query.exec((error, episodes) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (episodes) {
      res.json({
        data: episodes,
        message: "All episodes fetched",
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

exports.getEpisodeById = (req, res) => {
  Episode.findById(req.params.id, (err, episodes) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (episodes) {
      res.json({
        data: episodes,
        message: "Episode data fetched successfully",
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

exports.updateEpisodeById = (req, res) => {
  console.log(req.body);
  const {
    seriesName,
    title,
    posterUrl,
    season,
    description,
    director,
    stars,
    storyline,
    genres
  } = req.body;
  Episode.update({
    _id: req.params.id
  }, {
    seriesName,
    title,
    posterUrl,
    season,
    description,
    director,
    stars,
    storyline,
    genres
  }, {}, (error, episode) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(episode);
  });
};

exports.deleteEpisodeById  = (req, res) => {
  User.findOneAndDelete({
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
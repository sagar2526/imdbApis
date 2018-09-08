const Tv = require('../models/tv');

exports.postNewTv = (req, res) => {
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

  var tv = new Tv({
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
  Tv.save().then((tv) => {
    console.log('Added successfully');
    res.json(tv);
  });
};

exports.getAllTv = (req, res) => {
  Tv.find({}, (error, tv) => {
    if(error) {
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
  Tv.update({
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
  }, {}, (error, tv) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(tv);
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
      message: "Deleted successfully"
    });
  });

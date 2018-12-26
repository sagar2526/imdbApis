const Showtime = require('../models/showtimes');

exports.postNewShowtime = (req, res) => {
  if(req.body.theaterName && req.body.movie && req.body.address && req.body.rating && req.body.time){
  let {
    theaterName,
    movie,
    address,
    rating,
    time,
    createdAt,
    modifiedAt
  } = req.body;

  var showtime = new Showtime ({
    theaterName,
    movie,
    address,
    rating,
    time,
    createdAt,
    modifiedAt
  })
  showtime.save().then((showtime) => {
    console.log('Added successfully');
    res.json({
      message: "Added successfully",
      status: 200
    });
  }).catch(function (err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
  } else {
    res.json({
      message: 'Incomplete Inputs',
      status: 200
  });
}
};

exports.getAllShowtimes = (req, res) => {
  Showtime.find({}, (error, showtimes) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (showtimes) {
      res.json({
        data: showtimes,
        message: "All showtimes fetched",
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

exports.getShowtimeById = (req, res) => {
  Showtime.findById(req.params.id, (err, showtimes) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (showtimes) {
      res.json({
        data: showtimes,
        message: "Showtime data fetched successfully",
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
exports.updateShowtimeById = (req, res) => {
  console.log(req.body);
  const {
    theaterName,
    movie,
    address,
    rating,
    time
  } = req.body;
  Showtime.update({
    _id: req.params.id
  }, {
    theaterName,
    movie,
    address,
    rating,
    time
  }, {}, (error, showtime) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
      res.json({
        message: "showtime updated successfully",
        status: 200
    });
  });
};

exports.deleteShowtimeById = (req, res) => {
  Showtime.findOneAndDelete({
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
  });
};
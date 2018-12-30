const Celeb = require('../models/celebs');

exports.postNewCeleb = (req, res) => {
  if(req.body.name && req.body.pictureUrl && req.body.dob && req.body.height && req.body.bio && req.body.trivia){
  let {
    name,
    pictureUrl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  } = req.body;

  var celeb = new Celeb({
    name,
    pictureUrl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  });
  celeb.save().then((celeb) => {
    
      res.json({
        data: celeb,
        message: 'celeb added successfully',
        status: 200
      });
  })
  } else {
    res.json({
      message: 'Incomplete Inputs',
      status: 404
    });
}
};

exports.getAllCelebs = (req, res) => {
  Celeb.find({}, (error, celebs) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: "All celebs fetched",
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

exports.getCelebById = (req, res) => {
  Celeb.findById(req.params.id, (err, celebs) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: "Celeb data fetched successfully",
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

exports.updateCelebById = (req, res) => {
  console.log(req.body);
  const {
    name,
    pictureUrl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  } = req.body;
  Celeb.update({
    _id: req.params.id
  }, {
    name,
    pictureUrl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  }, {}, (error, celeb) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
      res.json({
        data: celeb,
        message: "celeb updated successfully",
        status: 200
    });
  });
};

exports.deleteCelebById  = (req, res) => {
  Celeb.findOneAndDelete({
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
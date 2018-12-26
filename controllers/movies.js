const Movie = require('../models/movies');

exports.postNewMovie = (req, res) => {
    if (
        req.body.title &&
        req.body.posterUrl &&
        req.body.trailerUrl &&
        req.body.description &&
        req.body.director &&
        req.body.writer &&
        req.body.stars &&
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
    } else {
        res.json({
            message: 'Incomplete Inputs',
            status: 200
        });
    }
};

exports.getAllMovies = (req, res) => {
    var query = Movie.find()
    if (req.query.title) {
        query.where({
            title: req.query.title
        })
    }
    query.select('title status -_id')
    query.limit(req.query.limit || 10)
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
                pagination: {
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
        genres
    }, {}, (error, movie) => {
        if (error)
            res.json({
                error: error,
                status: 500
            });
        console.log(error);
            res.json({
                message: "movie updated successfully",
                status: 200
        });
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
            message: "Deleted successfully",
            status: 200
        });
    });
};
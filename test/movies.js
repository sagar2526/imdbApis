const mongoose = require('mongoose');
const Movie = require('../models/movies');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Movies', () => {
  beforeEach((done) => {
    Movie.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/movies', () => {
    it('it should get all movies', (done) => {
      chai
        .request(app)
        .get('/api/v1/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('POST /api/v1/movies', () => {
    it('it should not post a movie', (done) => {
      let movie = {
        title: 'The Nun',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {actor: 'Jason Momoa', characterName: 'Arthur'},
          {actor: 'Amber Heard', characterName: 'Mera'},
          {actor: 'Willem Dafoe', characterName: 'Vulko'}
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'], //  stars: [actorSchema],
        storyline:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title']
      };
      chai
        .request(app)
        .post('/api/v1/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Incomplete Inputs');
          done();
        });
    });
    it('it should post a movie', (done) => {
      let movie = {
        title: 'The Nun',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      };
      chai
        .request(app)
        .post('/api/v1/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Added successfully');
          done();
        });
    });
  });
  describe('GET /api/v1/movies/:id', () => {
    it('it should GET a movie by the given id', (done) => {
      let movie = new Movie({
        title: 'The Nun',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .get('/api/v1/movies/' + movie.id)
          .send(movie)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            /* res.body.data.should.have.property('');
            res.body.data.should.have.property('');
            res.body.data.should.have.property(''); */
            res.body.data.should.have.property('_id').eql(movie.id);
            done();
          });
      });
    });
  });
  describe('PUT /api/v1/movies/:id', () => {
    it('it should update a movie given the id', (done) => {
      let movie = new Movie({
        title: 'The Nun',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun.',
        director: 'Travis Knight',
        writer: ['Christina Hodson'],
        stars: [
          {
            actor: 'Hailee Steinfeld',
            characterName: 'Charlie'
          },
          {
            actor: 'Jorge Lendeborg Jr.',
            characterName: 'Memo'
          },
          {
            actor: 'John Cena',
            characterName: 'Agent Burns'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        storyline:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .put('/api/v1/movies/' + movie.id)
          .send({
            title: 'Justice League',
            posterUrl: 'http://posterUrl.com/folder',
            trailerUrl: 'http://posterUrl.com/trailer',
            description:
              'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. ',
            director: 'James Wan',
            writer: [' David Leslie', 'Johnson-McGoldrick'],
            stars: [
              {
                actor: 'Jason Momoa',
                characterName: 'Arthur'
              },
              {
                actor: 'Amber Heard',
                characterName: 'Mera'
              },
              {
                actor: 'Willem Dafoe',
                characterName: 'Vulko'
              }
            ],
            photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
            //  stars: [actorSchema],
            storyline:
              'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
            keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
            genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Movie updated');
            res.body.should.have.property('status').eql(200);
            chai
              .request(app)
              .get('/api/v1/movies/' + movie.id)
              .send(movie)
              .end((err, res) => {
                res.body.data.should.have.property('title').eql('Justice League');
                done();
              });
          });
      });
    });
  });

  describe('DELETE /api/v1/movies/:id', () => {
    it('it should DELETE a movie given the id', (done) => {
      let movie = new Movie({
        title: 'Aquaman',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun.',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'In eighteenth-century France a girl (Suzanne Simonin) is forced against her will to take vows as a nun. Three mothers superior (Madame de Moni, Sister Sainte-Christine, and Madame de Chelles) treat her in radically different ways, ranging from maternal concern, to sadistic persecution, to lesbian desire.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .delete('/api/v1/movies/' + movie.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Deleted successfully');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
    });
  });
});
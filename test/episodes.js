const mongoose = require('mongoose');
const Episode = require('../models/episodes');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.use(chaiHttp);

describe('Episodes', () => {
  beforeEach((done) => {
    Episode.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/episodes', () => {
    it('it should get all episodes', (done) => {
      chai
        .request(app)
        .get('/api/v1/episodes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('POST /api/v1/episodes', () => {
    it('it should not post a episode', (done) => {
      let episode = {
        seriesName: 'GOT',
        title: 'Everything',
        posterurl: 'http://posterurl.com/folder',
        season: 2,
        description: 'something anything',
        director: 'Anurag Kashyap',
        stars: [{actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'], charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']}],
        storyLine: 'something anything'
      };
      chai
        .request(app)
        .post('/api/v1/episodes')
        .send(episode)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Incomplete Inputs');
          done();
        });
    });

    it('it should post a episode', (done) => {
      let episode = {
        seriesName: 'GOT',
        title: 'Everything',
        posterUrl: 'http://posterurl.com/folder',
        season: 2,
        description: 'something anything',
        director: 'Anurag Kashyap',
        stars: [
          {
            actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'],
            charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']
          }
        ],
        storyline: 'something anything',
        genres: ['life', 'Nature']
      };
      chai
        .request(app)
        .post('/api/v1/episodes')
        .send(episode)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Added successfully');
          done();
        });
    });
  });
  describe('GET /api/v1/episodes/:id', () => {
    it('it should GET a episode by the given id', (done) => {
      let episode = new Episode({
        seriesName: 'The Flash',
        title: 'Everything',
        posterUrl: 'http://posterurl.com/folder',
        season: 2,
        description: 'something anything',
        director: 'Anurag Kashyap',
        stars: [
          {
            actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'],
            charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']
          }
        ],
        storyline: 'something anything',
        genres: ['life', 'Nature']
      });
      episode.save((err, episode) => {
        chai
          .request(app)
          .get('/api/v1/episodes/' + episode.id)
          .send(episode)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('seriesName');
            res.body.data.should.have.property('posterUrl');
            res.body.data.should.have.property('description');
            res.body.data.should.have.property('genres');
            res.body.data.should.have.property('_id').eql(episode.id);
            done();
          });
      });
    });
  });
  describe('PUT /api/v1/episodes/:id', () => {
    it('it should update a episode given the id', (done) => {
      let episode = new Episode({
        seriesName: 'The Flash',
        title: 'Everything',
        posterUrl: 'http://posterurl.com/folder',
        season: 3,
        description: 'something anything',
        director: 'Anurag Kashyap',
        stars: [
          {
            actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'],
            charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']
          }
        ],
        storyline: 'something anything',
        genres: ['life', 'Nature']
      });
      episode.save((err, episode) => {
        chai
          .request(app)
          .put('/api/v1/episodes/' + episode.id)
          .send({
            seriesName: 'The Flash',
            title: 'Everything',
            posterUrl: 'http://posterurl.com/folder',
            season: 1,
            description: 'something anything',
            director: 'Anurag Kashyap',
            stars: [
              {
                actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'],
                charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']
              }
            ],
            storyline: 'anything something',
            genres: ['life', 'Nature', 'Action']
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Update Successfully');
            res.body.should.have.property('status').eql(200);
            chai
              .request(app)
              .get('/api/v1/episodes/' + episode.id)
              .send(episode)
              .end((err, res) => {
                res.body.data.should.have.property('season').eql(1);
                res.body.data.should.have.property('storyline').eql('anything something');
                res.body.data.should.have.property('genres').eql(['life', 'Nature', 'Action']);
                done();
              });
          });
      });
    });
  });
  describe('DELETE /api/v1/episodes/:id', () => {
    it('it should DELETE a episode given the id', (done) => {
      let episode = new Episode({
        seriesName: 'The Flash',
        title: 'Everything',
        posterUrl: 'http://posterurl.com/folder',
        season: 2,
        description: 'something anything',
        director: 'Anurag Kashyap',
        stars: [
          {
            actor: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg'],
            charaterName: ['sb', 'vm', 'vr', 'rs', 'ts', 'mg']
          }
        ],
        storyline: 'something anything',
        genres: ['life', 'Nature']
      });
      episode.save((err, episode) => {
        chai
          .request(app)
          .delete('/api/v1/episodes/' + episode.id)
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
const mongoose = require('mongoose');
const User = require('../models/users');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/users', () => {
    it('it should get all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    it('it should not post a user', (done) => {
      let user = {username: 'Sachin', email: 'sachin.lynn@xoggle.io'};
      chai
        .request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Incomplete Inputs');
          done();
        });
    });
    it('it should post a user', (done) => {
      let user = {
        username: 'Sachin',
        email: 'sachin.lynn@xoggle.io',
        password: '123'
      };
      chai
        .request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('User registered successfully');
          done();
        });
    });
  });
  describe('GET /api/v1/users/:id', () => {
    it('it should GET a user by the given id', (done) => {
      let user = new User({username: 'Sachin', email: 'sachin.lynn@xoggle.io', password: '123'});
      user.save((err, user) => {
        chai
          .request(app)
          .get('/api/v1/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('username');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('_id').eql(user.id);
            done();
          });
      });
    });
  });
  describe('PUT /api/v1/users/:id', () => {
    it('it should update a user given the id', (done) => {
      let user = new User({
        username: 'Higgins',
        email: 'higgins.jimenez@megall.me',
        password: 'commodo'
      });
      user.save((err, user) => {
        chai
          .request(app)
          .put('/api/v1/users/' + user.id)
          .send({username: 'sagar'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User updated successfully');
            res.body.should.have.property('status').eql(200);
            chai
              .request(app)
              .get('/api/v1/users/' + user.id)
              .send(user)
              .end((err, res) => {
                res.body.data.should.have.property('username').eql('sagar');
                done();
              });
          });
      });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({
        username: 'Higgins',
        email: 'higgins.jimenez@megall.me',
        password: 'commodo'
      });
      user.save((err, user) => {
        chai
          .request(app)
          .delete('/api/v1/users/' + user.id)
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
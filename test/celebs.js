const mongoose = require('mongoose');
const Celeb = require('../models/celebs');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Celebs', () => {
    beforeEach((done) => {
        Celeb.remove({}, (err) => {
            done();
        });
    });

    describe('GET /api/v1/celebs', () => {
        it('it should get all celebs', (done) => {
            chai
                .request(app)
                .get('/api/v1/celebs')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    done();
                });
        });
    });

    describe('POST /api/v1/celebs', () => {
        it('it should not post a celeb without the height', (done) => {
            let celeb = {
                name: 'Sylvia Neal',
                pictureUrl: 'http://picurl/32*32',
                dob: 'Fri Jul 24 1998 10:11:14 GMT+0000 (UTC)'
            };
            chai
                .request(app)
                .post('/api/v1/celebs')
                .send(celeb)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Incomplete Inputs');
                    done();
                });
        });
        it('it should post a celeb', (done) => {
            let celeb = {
                name: 'Sylvia Neal',
                pictureUrl: 'http://picurl/32*32',
                dob: 'Fri Jul 24 1998 10:11:14 GMT+0000 (UTC)',
                height: 7,
                bio: 'hero',
                trivia: 'romance'
            };
            chai
                .request(app)
                .post('/api/v1/celebs')
                .send(celeb)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('message').eql('celeb added successfully');
                    done();
                });
        });
    });
    describe('GET /api/v1/celebs/:id', () => {
        it('it should GET a celeb by the given id', (done) => {
            let celeb = new Celeb({
                name: 'Luann England',
                pictureUrl: 'http://picurl/32*32',
                dob: 'Thu Jul 30 2015 16:09:57 GMT+0000 (UTC)',
                height: 4
            });
            celeb.save((err, celeb) => {
                chai
                    .request(app)
                    .get('/api/v1/celebs/' + celeb.id)
                    .send(celeb)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('name');
                        res.body.data.should.have.property('pictureUrl');
                        res.body.data.should.have.property('dob');
                        res.body.data.should.have.property('height');
                        res.body.data.should.have.property('_id').eql(celeb.id);
                        done();
                    });
            });
        });
    });
    describe('PUT /api/v1/celebs/:id', () => {
        it('it should update a celeb given the id', (done) => {
            let celeb = new Celeb({
                name: 'Carroll Reed',
                pictureUrl: 'http://picurl/32*32',
                dob: 'Wed Feb 17 1971 07:51:26 GMT+0000 (UTC)',
                height: 7
            });
            celeb.save((err, celeb) => {
                chai
                    .request(app)
                    .put('/api/v1/celebs/' + celeb.id)
                    .send({
                        name: 'Carroll Reed',
                        pictureUrl: 'http://picurl/32*32',
                        dob: 'Wed Feb 17 1971 07:51:26 GMT+0000 (UTC)',
                        height: 6
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('celeb updated successfully');
                        res.body.should.have.property('status').eql(200);
                        chai
                            .request(app)
                            .get('/api/v1/celebs/' + celeb.id)
                            .send(celeb)
                            .end((err, res) => {
                                res.body.data.should.have.property('height').eql(6);
                                done();
                            });
                    });
            });
        });
    });

    describe('DELETE /api/v1/celebs/:id', () => {
        it('it should DELETE a celeb given the id', (done) => {
            let celeb = new Celeb({
                name: 'Carroll Reed',
                pictureUrl: 'http://picurl/32*32',
                dob: 'Wed Feb 17 1971 07:51:26 GMT+0000 (UTC)',
                height: 7
            });
            celeb.save((err, celeb) => {
                chai
                    .request(app)
                    .delete('/api/v1/celebs/' + celeb.id)
                    .end((err, res) => {
                        console.log(err);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Deleted successfully');
                        res.body.should.have.property('status').eql(200);
                        done();
                    });
            });        });
    });
});
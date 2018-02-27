'use strict';

const request = require('superagent');
require('../server.js');
require('jest');

describe('Strain Routers', function() {
  describe('GET /api/strain/:strainId', function() {
    it('should give a 404 status', function(done) {
      request.get('localhost:3000/api/strain/123456')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should give a 404 status', function(done) {
      request.get('localhost:3000/api/strain/')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should give a 200 status', function(done) {
      request.get('localhost:3000/api/strain/93119e35-325f-45b3-a10f-a2c3be5f67e5')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
  describe('POST /api/strain/', function() {
    it('should return a 400 error', function(done) {
      request.post('localhost:3000/api/strain')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should give a 200 status', function (done) {
      request.post('localhost:3000/api/strain')
        .send({ name: 'test name', type: 'test type' })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
});

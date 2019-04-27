'use strict';
require('jest');
const superagent = require('superagent');
require('../server.js');

describe('Response Codes', function () {
  describe('GET: /api/plant', function() {
    it('should respond with a 404 not found for valid request w/ an id that is not found', function(done) {
      superagent.get('localhost:3000/api/plant/123456')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('not found');
          done();
        });
    });
    it('should respond with a 400 when a request is made w/o an id', function(done) {
      superagent.get('localhost:3000/api/plant/')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
    it('should respond with a 200 when a valid request is made', function(done) {
      superagent.get('localhost:3000/api/plant/631e5cc4-f664-4f09-9613-6d02f7d0c184')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({'id':'631e5cc4-f664-4f09-9613-6d02f7d0c184','species':'aloe','color':'green','flower':false});
          done();
        });
    });
  });

  describe('POST: /api/plant', function() {
    it('should respond with a 400 bad request when no request body is provided', function(done) {
      superagent.post('localhost:3000/api/plant')
        .send( {species: 'rose'} )
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
    it('should respond with a 200 for a proper request made', function(done) {
      superagent.post('localhost:3000/api/plant')
        .send( {species: 'aloe', color: 'green', flower: false} )
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.species).toEqual('aloe');
          expect(res.body.color).toEqual('green');
          expect(res.body.flower).toEqual(false);
          done();
        });
    });
  });
  
  describe('Invalid usage', function() {
    it('should respond with a 404 for routes that are not registered', done => {
      superagent.get('localhost:3000/api/woohoo')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
      superagent.post('localhost:3000/api/huh')
        .send({ species: 'aloe', color: 'green', flower: false })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});
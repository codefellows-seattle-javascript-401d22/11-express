'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Weed Routes', function(){
  var weed = null;

  describe('POST: /api/weed', function(){
    it('should return weed', function(done){
      request.post('localhost:3000/api/weed')
        .send({ type: 'test type', strain: 'test strain' })
        .end((err, res) => {
          if (err) return done(err);
          weed = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(weed.type).toEqual('test type');
          expect(weed.strain).toEqual('test strain');
          done();
        });
    });
    it('should return a 400 bad request', function(done){
      request.post('localhost:3000/api/weed')
        .send({ type: '', strain: ''})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  //GET ROUTE TESTS


  describe('GET: /api/weed', function(){
    it('should return weed', function(done){
      request.get(`localhost:3000/api/weed/${weed.id}`)
        .end((err, res) => {
          if (err) return done(err);
          weed = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(weed.type).toEqual('test type');
          expect(weed.strain).toEqual('test strain');
          done();
        });
    });
    //test not passing
    it('should return a 404 not found', function(done){
      request.get('localhost:3000/api/weed/1234.json')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return a 400 error', function(done){
      request.get('localhost:3000/api/weed/')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  //DELETE ROUTE TESTS
  
  describe('DELETE: /api/weed', function(){
    it('should return a 400 error', function(done){
      request.delete(`localhost:3000/api/weed/123`)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
});
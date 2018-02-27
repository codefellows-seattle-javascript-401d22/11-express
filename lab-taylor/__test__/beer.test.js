'use strict';

const request = require('superagent');
require('../server.js');
require('jest');

describe('Beer Routes', function() {
  var beer = null;
  describe('POST: /api/beer', function() {
    it('should return a beer', function(done) {
      request.post('localhost:3000/api/beer')
        .send({name: 'some beer', style: 'some style'})
        .end((err,res) => {
          if(err) return done(err);
          beer = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(beer.name).toEqual('some beer');
          expect(beer.style).toEqual('some style');
          done();
        });
    });
    it('should return a 400 status', function(done) {
      request.post('localhost:3000/api/beer')
        .send({})
        .end((err,res) => {
          expect(res.status).toEqual(400);
          //expect(res.text).toEqual('bad request');
          done();
        });
    });
  });
  describe('GET: /api/beer', function() {
    it('should return a beer', function(done) {
      request.get(`localhost:3000/api/beer/${beer.id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(beer.name).toEqual('some beer');
          expect(beer.style).toEqual('some style');
          done();
        });
    });
    it('should return a 404 status', function(done) {
      request.get(`localhost:3000/api/beer?id=1234`)
        .end((err,res) => {
          expect(res.status).toEqual(404);
          
          done();
        });
    });
    it('should return a 400 status', function(done) {
      request.get(`localhost:3000/api/beer`)
        .end((err,res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });

  //#########################DELETE TEST#####################################################
  // describe('DELETE: /api/beer', function() {
  //   it('should delete a beer', function(done) {
  //     request.delete(`localhost:3000/api/beer?id=${beer.id}`)
  //       .end((err,res) => {
  //         if(err) return done(err);
  //         expect(res.status).toEqual(204);
  //         done();
  //       });
  //   });
  //   it('should return a 404 status', function(done) {
  //     request.delete(`localhost:3000/api/candle?id=1234`)
  //       .end((err,res) => {
  //         //console.log('result from del 404:', res);
  //         expect(res.status).toEqual(404);
  //         expect(res.text).toEqual('route not found');
  //         done();
  //       });
  //   });
  //   it('should return a 400 status', function(done) {
  //     request.delete(`localhost:3000/api/beer?funk=cheah`)
  //       .end( (err,res) => {
  //         expect(res.status).toEqual(400);
  //         expect(res.text).toEqual('bad request');
  //         done();
  //       });
  //   });
  // });
});
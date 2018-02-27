'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('House Routes', () => {
  var house = null;

  describe('POST: /api/house', () => {
    it('should post and return a house', done => {
      request.post('localhost:3000/api/house')
        .send({ city: 'Bellevue', price: '$1,000,000'})
        .end((err, res) => {
          if(err) return done(err);
          house = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(house.city).toEqual('Bellevue');
          expect(house.price).toEqual('$1,000,000');
          done();
        });
    });
  });

  describe('POST: /api/house', () => {
    it('should not post and should return a 400 error', (done) => {
      request.post('localhost:3000/api/house')
        .send({ })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/house', () => {
    it('should return a house', (done) => {
      request.get(`localhost:3000/api/house/${house.id}`)
        .end((err, res) => {
          if(err) return done(err);
          house = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(house.city).toEqual('Bellevue');
          expect(house.price).toEqual('$1,000,000');
          done();
        });
    });
  });
  
  describe('GET: /api/house', () => {
    it('should return a 404 error', (done) => {
      request.get('localhost:3000/api/house/wevfewvewvewv')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

  describe('GET: /api/house', () => {
    it('should return a 400 error', (done) => {
      request.get('localhost:3000/api/house/')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });


  describe('PUT: /api/house', () => {
    it('should update a house and return the updated house', (done) => {
      request.put(`localhost:3000/api/house/${house.id}`)
        .send({ city: 'Dallas', price: '$500,000'})
        .end((err, res) => {
          if(err) return done(err);
          house = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(house.city).toEqual('Dallas');
          expect(house.price).toEqual('$500,000');
          done();
        });
    });
  });
  
  describe('PUT: /api/house', () => {
    it('should not update and return a 400 error', (done) => {
      request.put('localhost:3000/api/house')
        .send({ })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('DELETE: /api/house', () => {
    it('should delete a house', (done) => {
      request.delete(`localhost:3000/api/house/${house.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(204);
          console.log(res.text);
          done();
        });
    });
  });

  describe('DELETE: /api/house', () => {
    it('should not delete and return a 400 error', (done) => {
      request.delete('localhost:3000/api/house')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

});

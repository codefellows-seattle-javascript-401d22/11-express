'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Cat Routes', () => {
  let cat = null;

  describe('POST: /api/cat', function() {
    it('should create and return a cat,', function(done) {
      request.post(`localhost:3000/api/cat`)
        .send({ name: 'Freyja', age: 1.5, favoriteToy: 'red ball' })
        .end((err, res) => {
          if (err) return done(err);
          cat = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('Freyja');
          expect(cat.age).toEqual(1.5);
          expect(cat.favoriteToy).toEqual('red ball');
          done();
        });
    });
    it('should respond with bad request if no req body or if req body is invalid', function(done) {
      request.post(`localhost:3000/api/cat`)
        .end((err, res) => {
          expect(res.text).toEqual('BadRequestError');
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/cat/:catId', function() {
    it('should GET and return a cat,', function(done) {
      request.get(`localhost:3000/api/cat/${cat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          cat = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('Freyja');
          expect(cat.age).toEqual(1.5);
          expect(cat.favoriteToy).toEqual('red ball');
          done();
        });
    });
    it('should respond with not found for valid requests made with an id that was not found', function(done) {
      request.get(`localhost:3000/api/cat/boo`)
        .end((err, res) => {
          expect(res.text).toEqual('NotFoundError');
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should respond with bad request if no id was provided in the request', function(done) {
      request.get(`localhost:3000/api/cat/`)
        .end((err, res) => {
          expect(res.text).toEqual('BadRequestError');
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('Unregistered Routes', function() {
    it('should return a status code of 404 for routes that have not been registered', function(done) {
      request.get(`localhost:3000/api/cat/notacat`)
        .send({ name: 'Freyja', age: 1.5, favoriteToy: 'red ball' })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('NotFoundError');
          done();
        });
    });
  });
});
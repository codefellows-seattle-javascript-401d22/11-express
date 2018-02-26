'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Car Routes', () => {
  var car = null;

  describe('POST: /api/car', () => {
    it('should return 400: bad request', (done) => {
      request.post('localhost:3000/api/car').send({
      }).end((err,res) => {
        expect(err.status).toEqual(400);
        expect(res.text).toEqual('bad request');
        done();
      });
    });
    it('should throw a JSON.parse error', (done) => {
      request.post('localhost:3000/api/car').send(
        ['make', 'model']).end((err,res) => {
        expect(err.status).toEqual(400);
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should return a car', (done) => {
      request.post('localhost:3000/api/car').send({
        make: 'test make',
        model: 'test model',
        year: 1983,
      }).end((err,res) => {
        if(err) return done(err);
        car = JSON.parse(res.text);
        expect(res.status).toEqual(200);
        expect(car.make).toEqual('test make');
        expect(car.model).toEqual('test model');
        expect(car.year).toBe(1983);
        done();
      });
    });
  });

  describe('GET: /api/car', () => {
    it('should respond 404: route not found', (done) => {
      request.get('localhost:3000/api/car/8').end((err, res) => {
        expect(err.status).toEqual(404);
        expect(res.text).toEqual('route not found');
        done();
      });
    });
    it('should respond 400: bad request', (done) => {
      request.get('localhost:3000/api/car/null').end((err,res) => {
        expect(res.status).toEqual(400);
        expect(res.text).toEqual('bad request');
        done();
      });
    });
    it('should return a list of storage ids', (done) => {
      request.get('localhost:3000/api/car').end((err,res) => {
        expect(err).toBe(null);
        expect(res.status).toEqual(200);
        expect(JSON.parse(res.text)).toEqual([`${car.id}.json`]);
        done();
      });
    });
    it('should return a car', (done) => {
      request.get(`localhost:3000/api/car?id=${car.id}`).end((err,res) => {
        expect(err).toBe(null);
        expect(res.status).toEqual(200);
        expect(car.make).toEqual('test make');
        expect(car.model).toEqual('test model');
        expect(car.year).toBe(1983);
        done();
      });
    });
  });

  describe('DELETE: /api/car', () => {
    it('should return 204', (done) => {
      request.delete(`localhost:3000/api/car?id=${car.id}`).end((err,res) => {
        if(err) return done(err);
        expect(res.status).toEqual(204);
        expect(res.text).toBe('');
        done();
      });
    });
  });
});

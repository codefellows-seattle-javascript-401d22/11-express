'use strict';

const request = require('superagent');
require('jest');
require('../server');

describe('Cat Routes', function() {
  let cat = null;

  describe('POST: /api/cat', function() {
    it('should create a cat', function(done) {
      request.post('localhost:3000/api/cat')
        .send( { name: 'Marco', color: 'black' } )
        .end((err, res) => {
          if (err) return done(err);
          cat = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('Marco');
          expect(cat.color).toEqual('black');
          done();
        });
    });
    it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
      request.post('localhost:3000/api/cat')
        .end((err, res) => {
          expect(res.text).toEqual('InternalServerError');
          expect(res.status).toEqual(500);
          done();
        });
    });
  });

  describe('GET: ')
});



'use strict';

const request = require('superagent');
require('../server.js');
require('jest');

describe('Strain Routers', function() {
  describe('GET', function() {
    it('should give a 404 error', function(done) {
      request.get('/api/strain/12345').end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
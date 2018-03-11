'use strict';

const request = require('superagent');
require('jest');
require('../server.js');


describe('Note Routes', function () {
  var note = null;
  describe('POST : api/note', function(){
    it('should post a note', function(done) {
      request.post('localhost:3000/api/note')
        .send({name: 'test note name', desc: 'test note description'})
        .end((err, res) => {
          if(err) return done(err);
          note = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(note.name).toEqual('test note name');
          expect(note.desc).toEqual('test note description');
          done();
        });
    });
    it('should return bad request id body is wrong', function(done) {
      request.post('localhost:3000/api/note')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:3000/api/note/${note.id}`)
        .end((err, res) => {
          if (err) return done(err);
          note = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(note.name).toEqual('test note name');
          expect(note.desc).toEqual('test note description');
          done();
        });
    });
    it('should return route not found', function(done) {
      request.get(`localhost:3000/api/note/1234`)
        .end((err, res) => {
          expect(err).toBeTruthy();
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return bad request', function (done) {
      request.get(`localhost:3000/api/note`)
        .end((err, res) => {
          expect(err).toBeTruthy();
          expect(res.status).toEqual(400);
          done();
        });
    });

  });

  
});

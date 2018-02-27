'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
const Cat = require('./model/cat');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json( { msg: 'hello from /test' } );
});

app.post('/api/cat', jsonParser, function(req, res, next) {
  debug('POST: /api/cat');
  // post cat to file system
  Cat.create(req.body)
    .then( cat => res.json(cat))
    .catch( err => next(err));
});

app.get('/api/cat/:catId', function(req, res, next) {
  debug('GET: /api/cat/:catId');
  Cat.fetch(req.params.catId)
    .then( cat => res.json(cat))
    .catch(err => next(err));
});

app.delete('/api/cat/:catId', function(req, res, next) {
  debug('DELETE: /api/cat/:catId');
  
  Cat.delete(req.params.catId)
    .then( () => res.json( { msg: `Cat at ${req.params.catId} deleted` } ))
    .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`Server up on PORT: ${PORT}`);
});
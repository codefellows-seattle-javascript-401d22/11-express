'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('beer:server');
const Beer = require('./model/beer.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req,res) {
  debug('GET: /test');
  res.json({msg: 'hello from /test'});
});

app.post('/api/beer', jsonParser, function(req, res, next) {
  debug('POST: /api/beer');
  if(!req.body.name || !req.body.style){
    return next(createError(400, new Error('bad request')));
  }
  Beer.createBeer(req.body)
    .then( beer => res.json(beer))
    .catch( err => next(err));
});

app.get('/api/beer', function(req,res,next) {
  return next(createError(400, new Error('bad request')));
});
  

app.get('/api/beer/:beerId', function(req,res, next) {
  debug('GET: /api/beer/beerId');
  Beer.fetchBeer(req.params.beerId)
    .then( beer => res.json(beer))
    .catch( err => next(err));
});

app.delete('/api/beer/:beerId', function(req,res,next) {
  debug('DELETE: /api/beer/beerId');
  Beer.deleteBeer(req.params.beerId)
    .then( () => res.status(204)).send('deleted')
    .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error module');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    next();
    return;

  }

  if (err.message === 'Not found') {
    res.status(err.status).send(err.message);
    next();
    return;

  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});


app.listen(PORT, () => {
  debug(`Server up at ${PORT}`);
});
  
  
  

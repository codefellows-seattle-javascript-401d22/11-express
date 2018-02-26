'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
const Car = require('./model/car.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req,res){
  debug('GET: /test');
  res.json({msg:'hello from /test town'});
});

app.post('/api/car', jsonParser, (req,res, next) => {
  debug('POST: /api/car');
  Car.createNote(req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

app.get('/api/car/:carId', (req,res,next) => {
  debug('GET: /api/car/:carId');
  
  Car.fetchCar(req.params.carId)
    .then(car => res.json(car))
    .catch(err => next(err));
});

app.get('/api/car', (req,res,next) => {
  debug('GET: /api/car');

  Car.lookupCarIds()
    .then( list => res.json(list))
    .catch(err => next(err));
});

app.delete('/api/car/:carId', (req,res,next) => {
  debug('DELETE: /api/car/:carId');

  Car.deleteCar(req.params.carId)
    .catch(err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('Server listening on', PORT);
});
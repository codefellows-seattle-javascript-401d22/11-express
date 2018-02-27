'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:server');
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
  Car.createCar(req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

app.get('/api/car/id/:carId', (req,res,next) => {
  console.log('carId:', req.params.carId);
  debug('GET: /api/car/id/:carId');
  if(req.params.carId === null){
    return next(createError(400, new Error('bad request')));
  }
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
    .then(() => res.status(204).send(`${req.params.carId} deleted`))
    .catch(err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err);

  if(err.status) {
    res.status(err.status).send(err.message);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('Server listening on', PORT);
});
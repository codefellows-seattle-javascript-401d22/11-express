'use strict';

const express = require('express');

const morgan = require('morgan');
// morgan is a logger for the app how long it took status request and status code
const createError = require('http-errors');
// http-errors - generates an error and hands it a http style status code
const jsonParser = require('body-parser').json();
// bodyparser parses request body
const debug = require('debug')('house:server');
// debug logs methods and functions in my application, stack trace
const House = require('./model/house.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

// http :3000/api/house/47e3ae12-450c-426f-b84f-444e98a7a718
app.get('/api/house/:houseId', function(req, res, next) {
  debug('GET: /api/house/:houseId');
  House.fetchHouse(req.params.houseId)
    .then( house => res.json(house))
    .catch( err => next(err));
});

// http :3000/api/house
app.get('/api/house', function (req, res) {
  debug('GET: /api/house:houseId');
  res.writeHead(400, {
    'Content-Type': 'application/json',
  });
  res.end();
});

// http POST :3000/api/house city=seattle price=600000
app.post('/api/house', jsonParser, function(req, res, next) {
  debug('POST: /api/house');

  House.createHouse(req.body)
    .then(house => res.json(house))
    .catch( err => next(err));
});

//http PUT :3000/api/house/47e3ae12-450c-426f-b84f-444e98a7a718 city=kirkland price=1000000
app.put('/api/house/:houseId', jsonParser, function(req, res, next) {
  debug('PUT: /api/house/:houseId');
  let house = {id: req.params.houseId, city: req.body.city, price: req.body.price};
  
  House.updateHouse(req.params.houseId, house)
    .then(house => res.json(house))
    .catch( err => next(err));
});

app.put('/api/house', function (req, res) {
  debug('GET: /api/house:houseId');
  res.writeHead(400, {
    'Content-Type': 'application/json',
  });
  res.end();
});

// http DELETE :3000/api/house/34431779-49b2-4c5d-9df4-793595a9cde2
app.delete('/api/house/:houseId', function(req, res, next) {
  debug('DELETE: /api/house/:houseId');

  House.deleteHouse(req.params.houseId)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch( err => next(err));
});

app.delete('/api/house', function (req, res) {
  debug('GET: /api/house:houseId');
  res.writeHead(400, {
    'Content-Type': 'application/json',
  });
  res.end();
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  if(err.toString().indexOf('expected')>-1) {
    res.status(400).send(err.name);
    return;
  }

  if(err.toString().indexOf('ENOENT')>-1) {
    res.status(404).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
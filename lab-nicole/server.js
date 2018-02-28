'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('plant:server');
const Plant = require('./model/plant.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/plant', jsonParser, (req, res, next) => {
  debug('POST: /api/plant');

  Plant.createItem(req.body)
    .then( plant => res.json(plant))
    .catch( err => next(err));
});

app.get('/api/plant/:plantId', (req, res, next) => {
  debug('GET: /api/plant/:plantId');
  
  Plant.fetchPlant(req.params.plantId)
    .then( plant => res.json(plant))
    .catch( err => next(err));
});

app.get('/api/plant/', (req, res, next) => {
  next(createError(400, 'bad request'));
});

app.delete('/api/plant/:plantId', (req, res, next) => {
  debug('DELETE: /api/plant/:plantId');

  Plant.removePlant(req.params.plantId)
    .then( () => res.writeHead(204))
    .catch( err => next(err));
});

app.use((err, req, res, next) => {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }

  err = createError(500, err.message);
  return res.status(err.status).send(err.name);
});

app.listen(3000, () => {
  debug(`server up: ${PORT}`);
});
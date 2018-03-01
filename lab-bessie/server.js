'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('strains:server');
const Strain = require('./model/strain.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/strain', jsonParser, function(req, res, next) {
  debug('POST: /api/strain');
  Strain.createStrain(req.body)
    .then(strain => res.json(strain))
    .catch(err => next(err));
});

app.get('/api/strain/:strainId', function(req, res, next) {
  debug('GET: /api/strain/:strainId');

  Strain.fetchStrain(req.params.strainId)
    .then(strain => res.json(strain))
    .catch(err => next(err));
});

app.delete('/api/strain/:strainId', function(req, res, next) {
  debug('DELETE: /api/strain/:strainId');
  
  Strain.deleteStrain(req.params.strainId);
  res.send('Delete request has been made!');
  next();
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
  next();
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});
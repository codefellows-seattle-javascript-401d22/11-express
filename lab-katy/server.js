'use strict'; 

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('weed:server');
const Weed = require('./model/weed.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'hello from testville!! (test get request)'});
});

app.post('/api/weed', jsonParser, function(req, res, next){
  debug('POST: /api/weed');
  Weed.createWeed(req.body)
  .then( weed => res.json(weed))
  .catch ( err => next(err));
});


//make sure to use descriptive id names rather than just doing a request to /id bc you can end up having tons of ids with different resources 

app.get('/api/weed/:weedId', function(req, res, next) {
  debug('GET: /api/weed/:weedId');
  console.log('weed id', req.params.weedId);
  
  Weed.fetchWeed(req.params.weedId)
  .then( weed => res.json(weed))
  .catch( err => next(err));
});
  
app.get('/api/weed/', function(req, res, next) {
  debug('GET: /api/weed/');
  console.log('weed idjkhhkh');
  res.sendStatus(400);
});

app.delete('/api/weed/:weedId', function(req, res, next) {
  debug('DELETE: /api/weed/:weedId');

  Weed.smokeWeed(req.params.weedId)
  .then( () => {
    res.send('Item has been deleted')
    res.sendStatus(204);
  })
  .catch( err => next(err));
})

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(400, err.message);
  res.status(err.status).send(err.name);
})

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});

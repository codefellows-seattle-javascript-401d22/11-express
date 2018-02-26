'use strict'; 

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('dubug')('band:server');
const Band = require('./model/band.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});

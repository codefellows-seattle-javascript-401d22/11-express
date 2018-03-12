'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('beer:beer');
const storage = require('../lib/storage.js');

const Beer = module.exports = function(name, style) {
  debug('Beer contructor');
  if(!name) throw new Error('expected name');
  if(!style) throw new Error('expected style');

  this.id = uuid();
  this.name = name;
  this.style = style;
};

Beer.createBeer = function(_beer) {
  debug('createBeer');

  try {
    let beer = new Beer(_beer.name, _beer.style);
    return storage.createItem('beer', beer);
  } catch (err) {
    return Promise.reject(err);
  }
};

Beer.fetchBeer = function(id) {
  debug('fetchBeer');
  return storage.fetchItem('beer', id);
};

Beer.deleteBeer = function(id) {
  debug('deleteBeer');
  
  try {
    return storage.deleteItem('beer', id);
  } catch (err) {
    return Promise.reject(err);
  }
};

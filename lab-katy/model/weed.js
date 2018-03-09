'use strict';

const uuidv4 = require('uuid/v4');
const debug = require('debug')('weed:weed');
const storage = require('../lib/storage.js');

const Weed = module.exports = function(type, strain) {
  debug('Weed Constructor');

  if(!type) throw new Error('expected type');
  if(!strain) throw new Error('expected strain');

  this.id = uuidv4();
  this.type = type;
  this.strain = strain;
};

//static methods
Weed.createWeed = function(_weed) {
  debug('createWeed');
  try {
    let weed = new Weed(_weed.type, _weed.strain);
    return storage.createItem('weed', weed);
  } catch (err) {
    return Promise.reject(err);
  }
};

Weed.fetchWeed =  function(id) {
  debug('fetchWeed');
  return storage.fetchItem('weed', id);
};

Weed.smokeWeed = function(id) {
  debug('smokeWeed');
  return storage.deleteItem('weed', id);
};

'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('house:house');
const storage = require('../lib/storage.js');

const House = module.exports = function(city, price) {
  debug('House constructor');
  if(!city)  throw new Error('expected city');
  if(!price) throw new Error('expected price');

  this.id = uuidv4();
  this.city = city;
  this.price = price;
};

House.createHouse = function(__house) {
  debug('createHouse');
  try {
    let house = new House(__house.city, __house.price);
    return storage.createItem('house', house);
  } catch (err) {
    return Promise.reject(err);
  }
};

House.fetchHouse = function(id) {
  debug('fetchHouse');
  try {
    return storage.fetchItem('house', id);
  } catch (err) {
    return Promise.reject(err);
  }
};

House.updateHouse = function(id, __house) {
  debug('updateHouse');
  try {
    return storage.updateItem('house', id, __house);
  } catch (err) {
    return Promise.reject(err);
  }
};

House.deleteHouse = function(id) {
  debug('deleteHouse');
  try {
    return storage.deleteItem('house', id);
  } catch (err) {
    return Promise.reject(err);
  }
};
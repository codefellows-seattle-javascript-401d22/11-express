'use strict';

const uuidv4 = require('uuid-v4');
const createError = require('http-errors');
const debug = require('debug')('plant:plant');
const storage = require('../lib/storage.js');

const Plant = module.exports = function(species, color, flower) {
  debug('Plant constructor');

  if(!species) createError(400, new Error('expected species'));
  if(!color) createError(400, new Error('expected color'));
  if(!flower) createError(400, new Error('expected flower'));

  this.id = uuidv4();
  this.species = species;
  this.color = color;
  this.flower = flower;
};  

Plant.createItem = function(_plant) {
  debug('createItem');

  try {
    let plant = new Plant(_plant.species, _plant.color, _plant.flower);
    console.log('new plant object', plant);
    return storage.createItem('plant', plant);
  } catch (err) {
    return Promise.reject(err);
  }
};

Plant.fetchPlant = function(id) {
  debug('fetchPlant');
  return storage.fetchPlant('plant', id);
};
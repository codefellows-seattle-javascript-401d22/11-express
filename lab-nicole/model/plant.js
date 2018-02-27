'use strict';

const uuidv4 = require('uuid-v4');
const createError = require('http-errors');
const debug = require('debug')('plant:plant');
const storage = require('../lib/storage.js');

const Plant = module.exports = function(species, color, flower) {
  debug('Plant constructor');

  this.id = uuidv4();
  this.species = species;
  this.color = color;
  this.flower = flower;
};  

Plant.createItem = function(_plant) {
  debug('createItem');
  
  if(_plant.species === undefined || _plant.color === undefined || _plant.flower === undefined) return Promise.reject(createError(400, 'bad request'));

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
  console.log(id);
  return storage.fetchItem('plant', id);
};

Plant.removePlant = function(id) {
  debug('removePlant');
  return storage.deleteItem('plant', id);
};
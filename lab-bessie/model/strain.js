'use strict';

const uuidv4 = require('uuid/v4');
const debug = require('debug')('strain:strain');
const storage = require('../lib/storage.js');

const Strain = module.exports = function(name, type) {
  debug('Strain constructor');

  if(!name) throw new Error('expected name');
  if(!type) throw new Error('expected type');

  this.id = uuidv4();
  this.name = name;
  this.type = type;
};

Strain.createStrain = function(_strain) {
  debug('createStrain');
  
  try {
    let strain = new Strain(_strain.name, _strain.type);
    return storage.createItem('strain', strain);
  } catch(err) {
    return Promise.reject(err);
  }
};

Strain.fetchStrain = function(id) {
  debug('fetchStrain');
  return storage.fetchItem('strain', id);
};

Strain.deleteStrain = function(id) {
  debug('deleteStrain');
  return storage.deleteItem('strain', id);
};
'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('cat:cat.js');
const storage = require('../lib/storage.js');

const Cat = module.exports = function(name, age, favoriteToy) {
  debug('Cat constructor');

  if (!name) throw new Error('expected name');
  if (!age) throw new Error('expected age');
  if (!favoriteToy) throw new Error('expected favorite toy');

  this.id = uuidv4();
  this.name = name;
  this.age = age;
  this.favoriteToy = favoriteToy;
};

Cat.createCat = function(_cat) {
  debug('createCat');

  try {
    let cat = new Cat(_cat.name, _cat.age, _cat.favoriteToy);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cat.fetchCat = function(id) {
  debug('fetchCat');
  return storage.fetchItem('cat', id);
};
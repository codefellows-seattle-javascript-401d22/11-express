'use strict';

const uuidv4 = require('uuid/v4');
// const createError = require('http-errors');
const debug = require('debug')('note:note');
const storage = require('../lib/storage');

const Cat = module.exports = function(name, color) {
  debug('Cat construtor');

  if (!name) throw new Error('expected name');
  if (!color) throw new Error('expected content');
  this.id = uuidv4();
  this.name = name;
  this.content = color;
};

Cat.create = function(_cat) {
  debug('create a cat');
  try {
    let cat = new Cat(_cat.name, _cat.content);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cat.fetch = function(id) {
  debug('fetch a cat');
  return storage.fetchItem('cat', id);
};

Cat.delete = function(id) {
  debug('delete a cat');
  return storage.deleteItem('cat', id);
};


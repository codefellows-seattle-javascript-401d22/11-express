'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('cat:storage.js');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if (!schemaName) return Promise.reject(createError(400, 'Expected schema name'));
  if (!item) return Promise.reject(createError(400, 'Expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item )
    .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400, 'Expected schema name'));
  if (!id) return Promise.reject(createError(400, 'Expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    })
    .catch( () => Promise.reject(createError(404, 'Not found')) );
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');

  if (!schemaName) return Promise.reject(createError(400, 'Expected schema name'));
  if (!id) return Promise.reject(createError(400, 'Expected id'));

  console.log(id);
  
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( () => Promise.resolve() )
    .catch( err => Promise.reject(err));
};
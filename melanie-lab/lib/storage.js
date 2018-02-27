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
    .catch( err => Promise.reject(createError(404, 'Not found')) );
};

// exports.deleteItem = (schemaName, id) => {
//   return new Promise((resolve, reject) => {
//     if (!schemaName) return reject(new Error('Expected schema name'));
//     if (!id) return reject(new Error('Expected id'));

//     /* credit: https://stackoverflow.com/questions/36659612/how-does-node-js-fs-unlink-works */
//     let resultHandler = err => { 
//       if (err) {
//         console.log('Unlink failed', err.code);
//         return reject();
//       } else {
//         console.log('File deleted');
//         return resolve();
//       }
//     };
  
//     fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`, resultHandler);

//   });
// };
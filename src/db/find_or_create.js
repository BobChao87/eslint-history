/*
 * This file is responsible for finding entries or making them if they
 * do not exist.
 */

let insert = require('./insert');
let select = require('./select');

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('eslint_history');

/**
 * @function findOrCreateOne
 *
 * @description
 *
 * Performs a singular findOrCreate statement against the database.
 *
 * @param {Object} datum Describes the record
 * @param {Object} [schema=null] Schema to validate against
 * @return {Promise.<Object>} The record fetched or error.
 */
function findOrCreateOne(datum, schema=null) {
  return new Promise((resolve, reject) => {
    select(datum)
      .then(record => {
        if (record.status) {
          resolve(record);
        } else {
          insert(datum, schema)
            .then(insertStatus => {
              if (insertStatus.status) {
                select(datum)
                  .then(record => {
                    resolve(record);
                  }, error => {
                    reject(error);
                  });
              } else {
                resolve(insertStatus);
              }
            }, error => {
              reject(error);
            });
        }
      }, error => {
        reject(error);
      });
  });
}

/**
 * @function findOrCreate
 *
 * @description
 *
 * Checks for an existing record and returns that, else inserts a record
 * matching the search terms (if possible) and returns that instead.
 *
 * @param {(Object|Object[])} data Describes the record to be returned.
 * @param {Object} [schema=null] Schema to validate against
 * @return {(Promise.<Object>|Promise.<Object[]>)} The value fetched or errors.
 */
function findOrCreate(data, schema=null) {
  if (!Array.isArray(data)) {
    return findOrCreateOne(data);
  }

  let records = [];
  for (let datum of data) {
    records.push(findOrCreateOne(datum, schema));
  }

  return Promise.all(records);
}

module.exports = findOrCreate;

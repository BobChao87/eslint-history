/*
 * This file is responsible for generalizing
 * database insertion and integrity checking.
 */

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('eslint_history');

/**
 * Propeties required by an insert.
 */
const REQUIRED_PROPERTIES = [
  'table',
  'columns'
];

/**
 * @function validateInsertObject
 *
 * @description
 *
 * Tests an object for suitability for being an insert.
 *
 * @param {Object} datum Describes a potential insert.
 * @param {Object} [schema=null] Schema to validate against
 * @return {Boolean} If the object is valid to perform an insert.
 */
function validateInsertObject(datum, schema=null) {
  let properties;
  try {
    /** @type {String[]} */
    properties = Object.keys(datum);
  } catch (ex) {
    console.error(`Inserts cannot be ${datum}.`);
    return false;
  }

  let missingProperties = [];
  for (let property of REQUIRED_PROPERTIES) {
    if (properties.indexOf(property) === -1) {
      missingProperties.push(property);
    }
  }
  if (missingProperties.length) {
    console.error(
      'Missing required propert' +
      missingProperties.length === 1 ? 'y. ' : 'ies. ' +
      JSON.stringify(missingProperties)
    );
    return false;
  }

  return true;
}

/**
 * @function insertOne
 *
 * @description
 *
 * Performs a singular insert statement against the database.
 *
 * @param {Object} datum Describes the insert
 * @param {Object} [schema=null] Schema to validate against
 * @return {Promise.<Object>} Describes what happened with the insert.
 */
function insertOne(datum, schema=null) {
  if (!validateInsertObject(datum, schema)) {
    return Promise.resolve({
      status: false,
      message: 'Invalid insert data.',
      originalData: datum
    });
  }

  let columns = [];
  let values = [];
  for (let column in datum.columns) {
    if (datum.columns.hasOwnProperty(column)) {
      columns.push(column);
      values.push(typeof datum.columns[column] === 'string' ?
        `"${datum.columns[column]}"` :
        datum.columns[column]
      );
    }
  }

  let statement = `
    INSERT INTO
      ${datum.table}
        (
          ${columns.join(',')}
        )
    VALUES
      (
        ${values.join(',')}
      )
  `;

  return new Promise((resolve, reject) => {
    db.run(statement,
      function(err) {
        if (err) {
          return resolve({
            status: false,
            message: err,
            originalData: datum,
            statement
          });
        }
        return resolve({
          status: true,
          message: 'Success',
          originalData: datum,
          statement
        });
      }
  );
  });
}

/**
 * @function insert
 *
 * @description
 *
 * Creates an insert statement and runs it against the database.
 *
 * @param {(Object|Object[])} data Describes the insert(s)
 * @param {Object} [schema=null] Schema to validate against
 * @return {(Promise.<Object>|Promise.<Object[]>)} Describes what happened with
 *    the inserts.
 */
function insert(data, schema=null) {
  if (!Array.isArray(data)) {
    return insertOne(data);
  }

  let inserts = [];
  for (let datum of data) {
    inserts.push(insertOne(datum, schema));
  }

  return Promise.all(inserts);
}

module.exports = insert;

/**
 * This file is responsible for generalizing
 * database insertion and integrity checking.
 */

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
 * @param {Object} data Describes a potential insert.
 * @return {Boolean} If the object is valid to perform an insert.
 */
function validateInsertObject(data) {
  try {
    /** @type {String[]} */
    let properties = Object.keys(data);
  } catch (ex) {
    console.error(`Inserts cannot be ${data}.`);
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
 * @function index
 *
 * @description
 *
 * Creates an insert statement and runs it against the database.
 *
 * @param {Object|Object[]} data Describes the insert(s)
 */
function insert(data) {
  if (!Array.isArray(data)) {

  }
}

module.exports = insert;

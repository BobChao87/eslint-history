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
 * @param {Object} datum Describes a potential insert.
 * @param {Object} [schema=null] Schema to validate against
 * @return {Boolean} If the object is valid to perform an insert.
 */
function validateInsertObject(datum, schema=null) {
  try {
    /** @type {String[]} */
    let properties = Object.keys(datum);
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
 * @function insertDatum
 *
 * @description
 *
 * Performs a singular insert statement against the database.
 *
 * @param {Object} datum Describes the insert
 * @param {Object} [schema=null] Schema to validate against
 * @return {Object} Describes what happened with the insert.
 */
function insertDatum(datum, schema=null) {
  // Double verify the datum, in case we ever expose this in other ways
  if (!validateInsertObject(datum, schema)) {
    return {
      status: false,
      message: 'Invalid insert data.',
      originalData: datum
    };
  }

  let columns = [];
  let values = [];
  for (column of schema.columns) {
    if (schema.columns.hasOwnProperty(column)) {
      insert.push(column);
      values.push(schema.columns[column]);
    }
  }

  db.run(`
    INSERT INTO
      ${datum.table}
        (
          ${columns.join(',')}
        )
    VALUES
      (
        ${value.join(',')}
      )
    `
  );

  return {};
}

/**
 * @function index
 *
 * @description
 *
 * Creates an insert statement and runs it against the database.
 *
 * @param {Object|Object[]} data Describes the insert(s)
 * @param {Object} [schema=null] Schema to validate against
 * @return {Object[]} Describes what happened with the inserts.
 */
function insert(data, schema=null) {
  if (!Array.isArray(data)) {
    data = [data];
  }

  let inserts = [];
  for (let datum of data) {
    if (!validateInsertObject(datum, schema)) {
      inserts.push({
        status: false,
        message: 'Invalid insert data.',
        originalData: datum
      });
    } else {
      inserts.push(insertDatum(datum, schema));
    }
  }

  return inserts;
}

module.exports = insert;

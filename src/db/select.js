/*
 * This file is responsible for generalizing database selection.
 */

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('eslint_history');

/**
 * @function selectOne
 *
 * @description
 *
 * Performs a singular select statement against the database.
 *
 * @param {Object} datum Describes the select
 * @return {Promise.<Object>} The value fetched or an error.
 */
function selectOne(datum) {
  let where = [];
  for (let column in datum.columns) {
    if (datum.columns.hasOwnProperty(column)) {
      let condition = '= ';
      let value = datum.columns[column];
      if (value === null) {
        condition = 'IS NULL';
      } else if (typeof value === 'string') {
        condition += `"${value}"`;
      } else {
        condition += value;
      }
      where.push(`${column} ${condition}`);
    }
  }

  let statement = `SELECT * FROM ${datum.table}`;
  if (where.length) {
    statement += ` WHERE ${where.join(' AND ')}`;
  }
  statement += ';';

  return new Promise((resolve, reject) => {
    db.all(statement,
      function(err, records) {
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
          statement,
          data: records
        });
      }
    );
  });
}

/**
 * @function select
 *
 * @description
 *
 * Creates an select statement and runs it against the database.
 *
 * @param {(Object|Object[])} data Describes the select(s)
 * @return {(Promise.<Object>|Promise.<Object[]>)} The value fetched or errors.
 */
function select(data) {
  if (!Array.isArray(data)) {
    return selectOne(data);
  }

  let selects = [];
  for (let datum of data) {
    inserts.push(selectOne(datum));
  }

  return Promise.all(selects);
}

module.exports = select;

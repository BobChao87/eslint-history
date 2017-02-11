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
 * @return {Promise.<Object>} Describes what happened with the select.
 */
function insertOne(datum) {
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

  let statement = `
    SELECT * FROM
      ${datum.table}
    WHERE
      ${where.join(' AND ')}
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
 * @function select
 *
 * @description
 *
 * Creates an select statement and runs it against the database.
 *
 * @param {(Object|Object[])} data Describes the select(s)
 * @return {(Promise.<Object>|Promise.<Object[]>)} Describes what happened with
 *    the selects.
 */
function select(data) {
  if (!Array.isArray(data)) {
    return selectOne(selectOne);
  }

  let selects = [];
  for (let datum of data) {
    inserts.push(selectOne(datum));
  }

  return Promise.all(selects);
}

module.exports = select;

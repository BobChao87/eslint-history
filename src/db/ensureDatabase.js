const schema = require('./schema');
const KW = require('./keywords');

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('eslint_history');

function makeColumn(column, data) {
  let columnString = [column];
  let dataKeys = Object.keys(data);

  if (dataKeys.indexOf(KW.TYPE) > -1) {
    columnString.push(data[KW.TYPE]);
  }
  if (dataKeys.indexOf(KW.PROPERTIES) > -1) {
    let properties = data[KW.PROPERTIES];
    for (let property in properties) {
      if (properties.hasOwnProperty(property)) {
        let constraint = property.replace('{}', properties[property]);
        columnString.push(constraint);
      }
    }
  }
  return columnString.join(' ');
}

function makeColumns(columns) {
  let columnStrings = [];
  for (let column in columns) {
    if (columns.hasOwnProperty(column)) {
      columnStrings.push(makeColumn(column, columns[column]));
    }
  }
  return columnStrings.join(', ');
}

function makeTable(table, columns) {
  db.run(
    `CREATE TABLE IF NOT EXISTS
      ${table}
      (
        ${makeColumns(columns)}
      )
    `
  );
}

function makeDatabase() {
  for (let tableName of Object.keys(schema)) {
    let columns = schema[tableName];
    makeTable(tableName, columns);
  }
}

makeDatabase();

module.exports = makeDatabase;

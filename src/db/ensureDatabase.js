(function() {
  const schema = require('./schema');

  var sqlite3 = require('sqlite3');
  var db = new sqlite3.Database('eslint_history');

  for (let tableName of Object.keys(schema)) {
    let columns = Object.keys(schema[tableName]);
    db.run(
      `CREATE TABLE IF NOT EXISTS
        ${tableName}
        (
          ${columns.join(', ')}
        )
      `
    );
  }
})();

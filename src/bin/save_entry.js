let db = require('../db');

function saveEntry(issue, fullPath, commit) {
  let insertData = parseIssue(issue, fullPath, commit);
  let insert = buildSingleInsert(insertData);
  // let inserts = db.insert(insert);
  return inserts;
}

function parseIssue(issue, fullPath, commit) {
  let insertData = {
    Commits: [],
    Paths: [],
    Files: [],
    Types: [],
    Extensions: [],
    Rules: [],
    Violations: []
  };

  insertData.Commits.push({
    version: commit
  });

  let pathSplit = fullPath.split('/');
  let filename = pathSplit.pop();
  let path = {
    name: pathSplit.join('/')
  };
  insertData.Paths.push(path);
  let file = {
    name: filename,
    path
  };
  insertData.Files.push(file);

  insertData.Types.push({
    longName: issue.level
  });
  let extension = null;
  if (issue.extension) {
    extension = {
      name: issue.extension
    };
    insertData.Extensions.push(extension);
  }
  let rule = {
    name: issue.rule,
    type: {
      longName: issue.level
    },
    extension
  };
  insertData.Rules.push(rule);

  insertData.Violations.push({
    content: issue.code,
    line: issue.line,
    position: issue.column,
    file,
    rule
  });

  return insertData;
};

function buildSingleInsert(insertData) {
  let insert = [];
  Object.entries(insertData).forEach((value) => {
    let table = value[0];
    value[1].forEach((columns) => {
      insert.push({
        table,
        columns
      });
    });
  });
  return insert;
}

module.exports = saveEntry;

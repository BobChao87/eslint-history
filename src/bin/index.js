#!/usr/bin/env node

var path = require('path');

var svn = require('../svn');
var eslint = require('../eslint');

var db = require('../db');
const schema = require('../db/schema');

const validArgs = require('./validArgs.json');
var parsedArgs = require('./parseArgs')(validArgs);

/**
 * @function main
 *
 * @description
 *
 * Does the ESLint
 *
 * @param {Object} args Key-value pairs of passed arguments
 */
function main(args) {
  svn.directory = args.directory;

  var start = Number(args.start);
  var end = Number(args.end);

  // It always excludes the trailing slash
  var basePathLength = path.resolve(svn.directory).length + 1;

  for (let revision = start; revision <= end; revision++) {
    svn.update(revision);
    let esout = eslint.eslint();
    esout = eslint.lineInfo(esout);
    console.log(`Revision ${revision}: ${esout[esout.length - 2].file}`);
    for (let file of esout) {
      if (!file.issues.length) {
        continue;
      }
      let filename = `${file.file.substring(basePathLength)}`; 
      console.log(filename);
      for (let issue of file.issues) {
        let data = {Violations: {}};
        data.Violations.line = issue.line;
        data.Violations.position = issue.column;
        data.Violations.content = issue.code;
        data.Violations.startCommit = {
          version: revision,
          user: null,
          comment: null,
          time: null
        };
        data.Violations.endCommit = {
          version: revision,
          user: null,
          comment: null,
          time: null
        };
        data.Violations.file = {
          name: filename.split('/').slice(-1)[0],
          path: {
            name: filename.split('/').slice(0, -1).join('/')
          }
        };
        data.Violations.rule = {
          name: issue.rule,
          type: {
            name: null,
            longName: issue.level,
            number: null
          }
        };
        if (issue.extension) {
          data.Violations.rule.extension = {
            name: issue.extension
          };
        }
        console.log(JSON.stringify(issue));
        console.log(JSON.stringify(data, null, '  '));
      }
    }
  }
}

main(parsedArgs);

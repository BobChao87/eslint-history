#!/usr/bin/env node

let path = require('path');

let svn = require('../svn');
let eslint = require('../eslint');

let db = require('../db');
const schema = require('../db/schema');

const validArgs = require('./validArgs.json');
let parsedArgs = require('./parseArgs')(validArgs);

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

  let start = Number(args.start);
  let end = Number(args.end);

  // It always excludes the trailing slash
  let basePathLength = path.resolve(svn.directory).length + 1;

  for (let revision = start; revision <= end; revision++) {
    svn.update(revision);
    let esout = eslint.eslint();
    esout = eslint.lineInfo(esout);
    console.log(`Revision ${revision}: ${esout[esout.length - 2].file}`);
    for (let file of esout) {
      if (!file.issues.length) {
        continue;
      }
      console.log(`${file.file.substring(basePathLength)}`);
      for (let issue of file.issues) {
        let data = {};
        for (let table of Object.keys(schema)) {
          data[table] = {};
        }
        console.log(JSON.stringify(data, null, '  '));
      }
    }
  }
}

main(parsedArgs);

#!/usr/bin/env node

let path = require('path');

let svn = require('../svn');
let eslint = require('../eslint');

let db = require('../db');

const validArgs = require('./valid_args.json');
let parsedArgs = require('./parse_args')(validArgs);
let saveEntry = require('./save_entry');

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
      let filename = `${file.file.substring(basePathLength)}`;
      console.log(filename);
      for (let issue of file.issues) {
        saveEntry(issue, filename, revision);
      }
    }
  }
}

main(parsedArgs);

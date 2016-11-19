#!/usr/bin/env node

var svn = require('../svn');
var eslint = require('../eslint');
var db = require('../db');

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
  var start = Number(args.start);
  var end = Number(args.end);

  for (let revision = start; revision <= end; revision++) {
    svn.update(revision);
    let esout = eslint.eslint();
    esout = eslint.lineInfo(esout);
    console.log(revision);
  }
}

main(parsedArgs);

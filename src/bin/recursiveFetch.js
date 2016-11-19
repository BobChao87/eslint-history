#!/usr/bin/env node

var svn = require('../svn');

var readline = require('readline');

const validArgs = require('./validArgs.json');

var parsedArgs = require('./parseArgs')(validArgs);

var logs = svn.log(parsedArgs.start, parsedArgs.end);

/**
 * @function recursiveFetch
 *
 * @description
 *
 * Helper function for maintaining synchronization between svn and git
 * for a local project. Also a good tester for the various features of
 * ESLint History.
 *
 * @param {string|number} revision Target revision to fetch
 * @param {string|number} end Target revsion to stop fetch on
 */
function recursiveFetch(revision, end) {
  var files = svn.update(revision);
  console.log(`Fetched revision ${revision}:`);
  for (let file of files) {
    console.log('\t', file);
  }
  var log = logs[revision];
  console.log(`
SVN Commit: ${log.revision}
Author: ${log.author}

${log.commitMessage}
`
  );
  if (revision < end) {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Hit ENTER to fetch next revision ', () => {
      rl.close();
      recursiveFetch(revision + 1, end);
    });
  } else {
    console.log('Final revision found');
  }
}

recursiveFetch(parseInt(parsedArgs.start, 10), Math.max(...Object.keys(logs)));

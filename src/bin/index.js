#!/usr/bin/env node

var svn = require('../svn');

const validArgs = {
  directory: {
    required: false,
    default: '.',
    position: 2,
    short: 'd',
    takesArg: true,
    requiredArg: true
  },
  start: {
    required: false,
    default: 'NEXT',
    position: 3,
    short: 's',
    takesArg: true,
    requiredArg: false
  },
  end: {
    required: false,
    default: 'HEAD',
    position: 4,
    short: 'e',
    takesArg: true,
    requiredArg: true
  },
  help: {
    required: false,
    default: null,
    position: null,
    short: 'h',
    takesArg: false,
    requiredArg: false
  }
};

var passedArgs = {};

// Tracks stuff
var ignoreThis = false;
process.argv.forEach(function processArg(arg, position, argv) {
  console.log(arg, position, argv);
  if (position < 2 || ignoreThis) {
    ignoreThis = false;
    // The first two are node and the file name. Ignore them.
    return;
  }
});

for (let arg in validArgs) {

}

console.log(validArgs, passedArgs);

#!/usr/bin/env node

var svn = require('../svn');

const validArgs = {
  directory: {
    required: false,
    default: '.',
    position: 0,
    short: 'd',
    takesArg: true,
    requiredArg: true
  },
  start: {
    required: false,
    default: 'NEXT',
    position: 1,
    short: 's',
    takesArg: true,
    requiredArg: false
  },
  end: {
    required: false,
    default: 'HEAD',
    position: 2,
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

var skipArg = false;
process.argv.forEach(function processArg(arg, position, argv) {
  if (position < 2 || skipArg) {
    skipArg = false;
    // The first two are node and the file name. Ignore them.
    return;
  }
  if (arg.startsWith('--')) {
    let args = arg.substr(2).split('=');
    skipArg = args.length === 1;
    passedArgs[args[0]] = {
      name: args[0],
      position,
      value: args[1] || argv[position + 1],
      valuePosition: position + (args.length > 1 ? 0 : 1)
    };
  } else if (arg.startsWith('-')) {
    let args = arg.substr(1).split('=');
    skipArg = args.length === 1;
    passedArgs[args[0]] = {
      name: args[0],
      position,
      value: args[1] || argv[position + 1],
      valuePosition: position + (args.length > 1 ? 0 : 1)
    };
  } else {
    passedArgs[position] = {
      name: null,
      position,
      value: arg,
      valuePosition: position
    };
  }
});

for (let argName in validArgs) {
  if (validArgs.hasOwnProperty(argName)) {
    let arg = validArgs[argName];
    if (argName in passedArgs) {
      console.log('Full name found:', argName, passedArgs[argName]);
    } else if (arg.short in passedArgs) {
      console.log('Short name found:', argName, passedArgs[arg.short]);
    } else if (Number.isInteger(arg.position)) {
      console.log('Requires a position:', argName);
    } else {
      console.log('Something something:', argName);
    }
  }
}

console.log(passedArgs);

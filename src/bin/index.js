#!/usr/bin/env node

var svn = require('../svn');

const validArgs = require('./validArgs.json');

var parsedArgs = require('./parseArgs')(validArgs);

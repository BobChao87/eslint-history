#!/usr/bin/env node

var svn = require('../svn');
var eslint = require('../eslint');
var db = require('../db');

const validArgs = require('./validArgs.json');
var parsedArgs = require('./parseArgs')(validArgs);

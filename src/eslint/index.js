let execSync = require('child_process').execSync;
let parse = require('./parse');
let readFile = require('./readFile');

/**
 * @function eslint
 *
 * @description
 *
 * Runs ESLint over the code base and passes the information through the
 * ESLint parser.
 *
 * @return {Object[]} Computer readable format ESLint output.
 */
function eslint() {
  // ESLint exits with a non-zero exit code when it detects errors
  // (and warnings?). So we call `exit 0` here to prevent that.
  // TODO We should run the local ESLint when possible and then
  // fallback to a system ESLint when it's not available.
  let eslint = execSync('eslint . ; exit 0')
    .toString();
  return parse(eslint);
}

/**
 * @function lineInfo
 *
 * @description
 *
 * Function responsible for taking the output of ESLint
 * and associating it with the correct line.
 *
 * @param {Object[]} eslint Output of the eslint function
 * @return {Object[]} Updated input in which each issue gets a line.
 */
function lineInfo(eslint) {
  let info = [];
  for (let file of eslint) {
    info.push(readFile(file));
  }
  return info;
}

let commands = {
  eslint,
  lineInfo,
};

module.exports = commands;

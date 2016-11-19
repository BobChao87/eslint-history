(function() {
  var execSync = require('child_process').execSync;
  var parse = require('./parse');
  var readFile = require('./readFile');

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
    var eslint = execSync('eslint . ; exit 0')
      .toString();
    return parse(eslint);
  }

  function lineInfo(eslint) {
    var info = [];
    for (let file of eslint) {
      info.push(readFile(file));
    }
    return info;
  }

  var commands = {
    eslint,
    lineInfo
  };

  module.exports = commands;
})();

(function() {
  const execSync = require('child_process').execSync;
  const parse = require('./parse');

  /**
   * @function runEslint
   *
   * @description
   *
   * Runs ESLint over the code base and passes the information through the
   * ESLint parser.
   *
   * @return {Object[]} Computer readable format ESLint output.
   */
  function runEslint() {
    // ESLint exits with a non-zero exit code when it detects errors
    // (and warnings?). So we call `exit 0` here to prevent that.
    var eslint = execSync('eslint . ; exit 0')
      .toString();
    return parse(eslint);
  }

  const eslint = {
    run: runEslint
  };

  console.log(JSON.stringify(runEslint(), null, '  '));

  module.exports = eslint;
})();

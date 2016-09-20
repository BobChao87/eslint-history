(function() {
  let execSync = require('child_process').execSync;

  /**
   * @function update
   *
   * @description
   *
   * Fetches the desired revision down. Regularly used with successive version
   * numbers in order to get a complete record of rules violations.
   *
   * @param {integer|string} [revision = 'HEAD'] Revision to check out.
   * @return {List.<string>} List of changed files (WIP)
   */
  function update(revision = 'HEAD') {
    try {
      return execSync(`svn up -r${revision}`).toString();
    } catch (err) {
      return 'err';
    }
  }

  function log(start = 1, stop = 'HEAD') {
    return execSync(`svn up -r${start}:${stop}`).toString();
  }

  var svn = {
    directory: '.',
    update: update,
    log: log
  };

  console.log(svn.update());

  module.exports = svn;
})();

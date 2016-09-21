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
      return execSync(`svn up -r${revision}`).toString().split('\n');
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  /**
   * @function log
   *
   * @description
   *
   * Used to pull information such as the log comment and the author.
   *
   * @param {number|string} [start=1] The first record to fetch a log for.
   * @param {number|string} [stop='Head'] The last record to fetch a log for.
   * @return {Object.<string>} Object indexed by the revision containing author and comment. (WIP)
   */
  function log(start = 1, stop = 'HEAD') {
    try {
      return execSync(`svn up -r${start}:${stop}`).toString();
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  var svn = {
    directory: '.',
    update: update,
    log: log
  };

  module.exports = svn;
})();

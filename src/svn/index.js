(function() {
  const execSync = require('child_process').execSync;
  const fs = require('fs');

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
    var fetchedFiles;
    try {
      fetchedFiles = execSync(`svn up -r${revision}`).toString().split('\n');
    } catch (err) {
      console.log(err);
      return [];
    }
    return fetchedFiles.forEach(checkIfFile);
  }

  /**
   * @function checkIfFile
   *
   * @description
   *
   * Function to help trim out file names from from the update.
   * Checks for read access in addition to make sure we can use it.
   *
   * @param {string} fetchedFile A single line of output from the svn update command.
   * @param {number} index The index of the string in the output.
   * @param {List.<string>} fetchedFiles The original output from svn update.
   */
  function checkIfFile(fetchedFile, index, fetchedFiles) {
    var svnPrefixLength = 37;
    var fileName = fetchedFile.substring(svnPrefixLength);
    try {
      fs.accessSync(fileName, fs.R_OK);
      fetchedFiles[index] = fileName;
    } catch (err) {
      console.log(err);
      fetchedFile[index] = '';
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

  console.log(svn.update());

  module.exports = svn;
})();

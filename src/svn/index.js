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
      console.log(`Unable to fetch revision ${revision}.`);
      return [];
    }
    fetchedFiles.forEach(checkIfFile);
    return fetchedFiles.filter(isFile);
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
    var svnPrefixLength = 5;
    var fileName = fetchedFile.substring(svnPrefixLength);
    try {
      fs.accessSync(fileName, fs.R_OK);
      fetchedFiles[index] = fileName;
    } catch (err) {
      fetchedFiles[index] = '';
    }
  }

  /**
   * @function isFile
   *
   * @description
   *
   * Takes the output from `checkIfFile` and compares it to see if
   * a file was found or if an empty string was returned.
   *
   * @param {string} fetchedFile A string returned by `checkIfFile`.
   * @return {boolean} True if not an empty string.
   */
  function isFile(fetchedFile) {
    return Boolean(fetchedFile);
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
    var logs = [];
    try {
      logs = execSync(`svn log -r${start}:${stop}`).toString().split('\n');
    } catch (err) {
      console.log(
        `Unable to fetch logs for revision ${start} to revision ${stop}`
      );
      return {};
    }
    logs.forEach(findLogStart);
    return logs;
  }

  /**
   * @function findLogStart
   *
   * @description
   *
   * Checks every line from the log function to see if it matches what the
   * system expects a log start to begin with. Then finds the length of the log
   * which is used to create the log object.
   *
   * @param {string} row A single line from `svn log`
   * @param {number} index The index in the array that this row is located at.
   * @param {Array.<string>} logs The original set of logs, used to find the end.
   */
  function findLogStart(row, index, logs) {
    if (row.match(/^-{10,100}$/)) {
      let start = index;
      let end;
      index++;
      while (!end && index < logs.length) {
        if (logs[index].match(/^-{10,100}$/)) {
          end = index;
        }
        index++;
      }
      if (end) {
        console.log(`Found log between ${start} and ${end}.`);
      } else {
        console.log(`Found end of logs at ${start}.`);
      }
    }
  }

  var svn = {
    directory: '.',
    update: update,
    log: log
  };

  module.exports = svn;
})();

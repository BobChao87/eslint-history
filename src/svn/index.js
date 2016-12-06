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
  let fetchedFiles;
  try {
    // Not worried about use before define, this function won't be called
    // eslint-disable-next-line no-use-before-define
    fetchedFiles = execSync(`svn up -r${revision} ${svn.directory}`)
      .toString()
      .split('\n');
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
 * @param {string} fetchedFile A single line of output from the svn update
 *    command.
 * @param {number} index The index of the string in the output.
 * @param {List.<string>} fetchedFiles The original output from svn update.
 */
function checkIfFile(fetchedFile, index, fetchedFiles) {
  let svnPrefixLength = 5;
  let fileName = fetchedFile.substring(svnPrefixLength);
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
 * @return {Object.<string>} Object indexed by the revision containing author
 *    and comment. (WIP)
 */
function log(start = 1, stop = 'HEAD') {
  let logsRaw = [];
  let logs = {};
  try {
    // Not worried about use before define, this function won't be called
    // eslint-disable-next-line no-use-before-define
    logsRaw = execSync(`svn log -r${start}:${stop} ${svn.directory}`)
      .toString()
      .split('\n');
  } catch (err) {
    console.log(`Unable to fetch logs for revisions ${start} to ${stop}.`);
    return {};
  }
  for (let index = 0, len = logsRaw.length; index < len; index++) {
    index = findLogs(index, logsRaw, logs);
  }
  return logs;
}

/**
 * @function findLogs
 *
 * @description
 *
 * Checks every line from the log function to see if it matches what the
 * system expects a log start to begin with. Then finds the length of the log
 * which is used to create the log object.
 *
 * @param {number} index The index in the array that this row is located at.
 * @param {Array.<string>} logsRaw The original set of logs, used to find the
 *    end.
 * @param {Object.<string>} logs The output array for collected logs.
 * @return {number} The last line of the log found or the `index` unmodified.
 */
function findLogs(index, logsRaw, logs) {
  if (logsRaw[index].match(/^-{10,100}$/)) {
    // Add one since the delimiter isn't part of the SVN log.
    let start = index + 1;
    let end;
    // We increment index outside and then at the end instead of just at the
    // beginning because this allows us to avoid having to special-detect out
    // of bounds.
    let currentIndex = start;
    let len = logsRaw.length;
    while (currentIndex < len) {
      if (logsRaw[currentIndex].match(/^-{10,100}$/)) {
        // Subtract one off since the termination line is not part of the
        // message.
        end = currentIndex - 1;
        break;
      }
      currentIndex++;
    }
    if (end) {
      packageLog(logs, logsRaw, start, end);
      return end;
    }
  }
  // If we don't enter the IF, or make it out,
  // it's not a match, so keep searching from the same spot.
  return index;
}

/**
 * @function packageLog
 *
 * @description
 *
 * Takes the raw logs and parses them into information that can be used by
 * the linter to ascribe information such as author, commit number, and
 * message to a given log and the associated checks.
 *
 * @param {Object.<string>} logs The output array for collected logs.
 * @param {Array.<string>} logsRaw The original set of logs, used for parsing.
 * @param {number} start The first line of the log in question.
 * @param {number} end The last line of the log in question.
 */
function packageLog(logs, logsRaw, start, end) {
  let info = logsRaw[start].split('|');
  info.forEach((infoEntry, index, info) => {
    info[index] = infoEntry.trim();
  });
  let [revision, author, commitTime, lines] = info;
  // The commit message starts on the line after the blank line following the
  // info.
  let commitMessage = logsRaw.slice(start + 2, end + 1).join('\n');

  // Cleanup info for storage
  // We don't need the leading 'r'.
  revision = revision.substr(1);
  let commitTimeEpochMillis = Date.parse(commitTime);

  logs[revision] = {
    revision,
    author,
    commitTime,
    commitTimeEpochMillis,
    lines,
    commitMessage,
  };
}

let svn = {
  directory: '.',
  update,
  log,
};

module.exports = svn;

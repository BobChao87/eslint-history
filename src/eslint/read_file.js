const readFileSync = require('fs').readFileSync;

/**
 * @function readFile
 *
 * @description
 *
 * Takes a file object and opens and parses the file to extract information
 * about the issues that are associated with this file.
 *
 * @param {Object} file Singular file instances from `parse`.
 * @return {Object} Updated input where each issues has a `code` entry.
 */
function readFile(file) {
  let contents;
  try {
    contents = readFileSync(file.file).toString().split('\n');
  } catch (err) {
    // We'll need to add a verbose flag later.
    // console.log(`Could not read file "${file.file}".`);
    return file;
  }
  for (let issue of file.issues) {
    // Compensate for the fact that arrays are 0-indexed but files are 1
    issue.code = contents[issue.line - 1];
  }
  return file;
}

module.exports = readFile;

(function() {
  // Excessive length but necessary RegExp literal. Making it via string
  // would be annoying and costly.
  /**
   * 1 : Line number
   * 2 : Column number
   * 3 : Level of issue
   * 4 : Message text
   * 5 : (optional) Rule set
   * 6 : Rule name
   */
  // eslint-disable-next-line max-len
  const lineRegex = /^\s+(\d+):(\d+)\s+([a-zA-Z-]+)\s+(.*[^\s])\s+(?:([a-zA-Z-]+)\/)?([a-zA-Z-]+)$/;
  //                     1  /1 2  /2   3         /3   4      /4      5         /5    6         /6

  /**
   * @function parseLine
   *
   * @description
   *
   * Takes a raw line and parses it into information about the line.
   * This information includes the line number in the file, the column
   * in the line, the exact text of the message, the level of the issue,
   * and the rule that was fired to cause the issue.
   *
   * @param {string} line The line to be parsed
   * @return {Object} information about the parsed line.
   */
  function parseLine(line) {
    var results = lineRegex.exec(line);
    return results && {
      line: results[1],
      column: results[2],
      level: results[3],
      text: results[4],
      extension: results[5],
      rule: results[6]
    };
  }

  /**
   * 1 : filename
   */
  const fileRegex = /^([^\s].*[^\s])$/;
  //                  1           /1

  /**
   * @function parseFile
   *
   * @description
   *
   * Takes a string that contains (typically) several lines starting with a line
   * describing the file followed by several describing errors for that file.
   * While not an error to pass multiple files, any extra files and entries will
   * be silently ignored.
   *
   * @param {string} fileChunk Several lines describing the file and issues.
   * @return {Object} information about the parsed file.
   */
  function parseFile(fileChunk) {
    var lines = fileChunk.split('\n');
    var file = {issues: []};
    for (let line of lines) {
      if (fileRegex.test(line)) {
        if (file.file) {
          // We already found the file name, so this must be an extra entry.
          break;
        }
        file.file = line;
      } else if (lineRegex.test(line)) {
        file.issues.push(parseLine(line));
      }
    }
    return file;
  }

  /**
   * @function parse
   *
   * @description
   *
   * Takes in the full output of ESLint and parses it into a more
   * machine-readable format. This format is also fairly human readable.
   * Specifically it's an array of entries of output from parseFile.
   *
   * @param {string} output Full output of ESLint
   * @return {Object[]} Several objects containing info about single files.
   */
  function parse(output) {
    var files = output.split('\n\n');
    var parsedFiles = [];
    for (let file of files) {
      parsedFiles.push(parseFile(file));
    }
    return parsedFiles;
  }

  module.exports = parse;
})();

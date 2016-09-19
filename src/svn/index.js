(function() {
  let execSync = require('child_process').execSync;

  function update(revision = 'HEAD') {
    try {
      return execSync(`echo "svn up -r${revision}"`);
    } catch (err) {
      return 'err';
    }
  }

  function log(start = 1, stop = 'HEAD') {
    return execSync(`svn up -r${start}:${stop}`);
  }

  var svn = {
    directory: '.',
    update: update,
    log: log
  };

  console.log(svn.update());

  module.exports = svn;
})();

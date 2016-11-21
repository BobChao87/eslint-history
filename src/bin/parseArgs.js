(function() {
  /**
   * @function passedArgs
   *
   * @description
   *
   * Pulls out the passed arguments from the commandline.
   *
   * @return {Object} The name or position passed on the commandline.
   *    Value is various information about the passed arg.
   *        name: Name of the arg, if passed as an option.
   *        position: Where it was found.
   *        value: Value of the argument.
   *        valuePosition: Place the value was found.
   */
  function passedArgs() {
    var passedArgs = {};

    var skipArg = false;
    process.argv.forEach(function processArg(arg, position, argv) {
      if (position < 2 || skipArg) {
        skipArg = false;
        // The first two are node and the file name. Ignore them.
        return;
      }
      var passedArg;
      if (arg.startsWith('--')) {
        let args = arg.substr(2).split('=');
        skipArg = args.length === 1;
        passedArg = {
          name: args[0],
          position,
          value: args[1] || argv[position + 1],
          valuePosition: position + (args.length > 1 ? 0 : 1)
        };
      } else if (arg.startsWith('-')) {
        let args = arg.substr(1).split('=');
        skipArg = args.length === 1;
        passedArg = {
          name: args[0],
          position,
          value: args[1] || argv[position + 1],
          valuePosition: position + (args.length > 1 ? 0 : 1)
        };
      } else {
        passedArg = {
          name: null,
          position,
          value: arg,
          valuePosition: position
        };
      }
      passedArgs[passedArg.name || passedArg.position] = passedArg;
    });

    return passedArgs;
  }

  /**
   * @function parsedArgs
   *
   * @description
   *
   * Figures out which args passed are in the required set of args.
   * Handles rejection of required args that aren't given.
   *
   * @param {Object} validArgs {@see:parseArgs}
   * @param {Object} passedArgs {@see:passedArgs}
   * @return {Object} Key-value pairs of the passed arguments.
   */
  function parsedArgs(validArgs, passedArgs) {
    var parsedArgs = {};
    for (let argName in validArgs) {
      if (validArgs.hasOwnProperty(argName)) {
        let arg = validArgs[argName];
        if (argName in passedArgs) {
          // console.log('Full name found:', argName, passedArgs[argName]);
          parsedArgs[argName] = passedArgs[argName].value;
        } else if (arg.short in passedArgs) {
          // console.log('Short name found:', argName, passedArgs[arg.short]);
          parsedArgs[argName] = passedArgs[arg.short].value;
        // No handle position for now. Let's just make this work.
        // } else if (Number.isInteger(arg.position)) {
        //   console.log('Requires a position:', argName);
        } else if (arg.default) {
          // console.log('Using default:', argName, arg.default);
          parsedArgs[argName] = arg.default;
        } else if (arg.required) {
          console.error(`Cannot proceed without "${argName}".`);
          process.exit(1);
        } else {
          // console.log('Something something:', argName);
        }
      }
    }

    return parsedArgs;
  }

  /**
   * @function parseArgs
   *
   * @description
   *
   * Takes a list of valid arguments to parse the input for.
   * Gathers each argument with its value and will halt execution
   * if a required argument is missing.
   *
   * @param {Object} validArgs Keys are valid passable argument names.
   * @param {Object} validArgs.key Any valid key for the function.
   * @param {boolean} validArgs.key.required If this is a required argument.
   * @param {*} validArgs.key.default Any value that should be assigned if not found.
   * @param {string} validArgs.key.short A short (-<value>) version of the argument.
   * @param {boolean} validArgs.key.takesArg If this takes an argument.
   *    If false, presence of this arg will be returned with `true`.
   *    Explicit arguments (i.e. --key=false) are not allowed.
   * @param {boolean} validArgs.key.requiredArg If this needs an argument.
   * @return {Object} Key-value pairs of the passed arguments.
   */
  function parseArgs(validArgs) {
    var passed = passedArgs();
    return parsedArgs(validArgs, passed);
  }

  module.exports = parseArgs;
})();

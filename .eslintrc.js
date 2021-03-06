module.exports = {
  "installedESLint": true,
  "env": {
    "es6": true,
    "node": true,
  },
  "rules": {
  // Possible Errors
//     "no-cond-assign": [],
//     "no-console": [],
//     "no-constant-condition": [],
//     "no-control-regex": [],
//     "no-debugger": [],
//     "no-dupe-args": [],
//     "no-dupe-keys": [],
//     "no-duplicate-case": [],
//     "no-empty-character-class": [],
//     "no-empty": [],
//     "no-ex-assign": [],
//     "no-extra-boolean-cast": [],
//     "no-extra-parens": [],
//     "no-extra-semi": [],
//     "no-func-assign": [],
//     "no-inner-declarations": [],
//     "no-invalid-regexp": [],
    "no-irregular-whitespace": [
      "error",
      {
        "skipStrings": false,
        "skipComments": false,
        "skipRegExps": false,
        "skipTemplates": true
      }
    ],
//     "no-obj-calls": [],
//     "no-prototype-builtins": [],
//     "no-regex-spaces": [],
//     "no-sparse-arrays": [],
//     "no-template-curly-in-string": [],
//     "no-unexpected-multiline": [],
//     "no-unreachable": [],
//     "no-unsafe-finally": [],
//     "no-unsafe-negation": [],
//     "use-isnan": [],
//     "valid-jsdoc": [],
//     "valid-typeof": [],

  // Best Practices
//     "accessor-pairs": [],
//     "array-callback-return": [],
//     "block-scoped-var": [],
//     "class-methods-use-this": [],
//     "complexity": [],
//     "consistent-return": [],
    "curly": [ // [2]
      "error",
      "multi-line",
      "consistent",
    ],
//     "default-case": [],
//     "dot-location": [],
//     "dot-notation": [],
//     "eqeqeq": [],
//     "guard-for-in": [],
//     "no-alert": [],
//     "no-caller": [],
//     "no-case-declarations": [],
//     "no-div-regex": [],
//     "no-else-return": [],
//     "no-empty-function": [],
//     "no-empty-pattern": [],
//     "no-eq-null": [],
//     "no-eval": [],
//     "no-extend-native": [],
//     "no-extra-bind": [],
//     "no-extra-label": [],
//     "no-fallthrough": [],
//     "no-floating-decimal": [],
//     "no-global-assign": [],
//     "no-implicit-coercion": [],
//     "no-implicit-globals": [],
//     "no-implied-eval": [],
//     "no-invalid-this": [],
//     "no-iterator": [],
//     "no-labels": [],
//     "no-lone-blocks": [],
//     "no-loop-func": [],
//     "no-magic-numbers": [],
//     "no-multi-spaces": [],
//     "no-multi-str": [],
//     "no-new-func": [],
//     "no-new-wrappers": [],
//     "no-new": [],
    "no-octal-escape": [
      "error"
    ],
//     "no-octal": [],
//     "no-param-reassign": [],
//     "no-proto": [],
//     "no-redeclare": [],
//     "no-restricted-properties": [],
//     "no-return-assign": [],
//     "no-return-await": [],
//     "no-script-url": [],
//     "no-self-assign": [],
//     "no-self-compare": [],
//     "no-sequences": [],
//     "no-throw-literal": [],
//     "no-unmodified-loop-condition": [],
//     "no-unused-expressions": [],
//     "no-unused-labels": [],
//     "no-useless-call": [],
//     "no-useless-concat": [],
//     "no-useless-escape": [],
//     "no-useless-return": [],
//     "no-void": [],
//     "no-warning-comments": [],
//     "no-with": [],
//     "radix": [],
//     "require-await": [],
//     "vars-on-top": [],
//     "wrap-iife": [],
//     "yoda": [],

  // Strict Modes
//     "strict": [],

  // Variables
//     "init-declarations": [],
//     "no-catch-shadow": [],
//     "no-delete-var": [],
//     "no-label-var": [],
//     "no-restricted-globals": [],
//     "no-shadow-restricted-names": [],
//     "no-shadow": [],
//     "no-undef-init": [],
//     "no-undef": [],
//     "no-undefined": [],
//     "no-unused-vars": [],
//     "no-use-before-define": [],

  // Node.js and CommonJS
//     "callback-return": [],
//     "global-require": [],
//     "handle-callback-err": [],
//     "no-mixed-requires": [],
//     "no-new-require": [],
//     "no-path-concat": [],
//     "no-process-env": [],
//     "no-process-exit": [],
//     "no-restricted-modules": [],
//     "no-sync": [],

  // Stylistic Issues
//     "array-bracket-spacing": [],
//     "block-spacing": [],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": false,
      }
    ],
//     "camelcase": [],
//     "capitalized-comments": [],
//     "comma-dangle": [],
//     "comma-spacing": [],
//     "comma-style": [],
//     "computed-property-spacing": [],
//     "consistent-this": [],
//     "eol-last": [],
//     "func-call-spacing": [],
//     "func-name-matching": [],
//     "func-names": [],
//     "func-style": [],
//     "id-blacklist": [],
//     "id-length": [],
//     "id-match": [],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "VariableDeclarator": {
          "var": 1,
          "let": 1,
          "const": 1,
        },
        "outerIIFEBody": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": {
          "parameters": 2,
          "body": 1,
        },
        "FunctionExpression": {
          "parameters": 2,
          "body": 1,
        },
        "CallExpression": {
          "arguments": 1,
        },
      },
    ],
//     "jsx-quotes": [],
//     "key-spacing": [],
//     "keyword-spacing": [],
//     "line-comment-position": [],
//     "linebreak-style": [],
//     "lines-around-comment": [],
//     "lines-around-directive": [],
//     "max-depth": [],
//     "max-len": [],
//     "max-lines": [],
//     "max-nested-callbacks": [],
//     "max-params": [],
//     "max-statements-per-line": [],
//     "max-statements": [],
//     "multiline-ternary": [],
//     "new-cap": [],
//     "new-parens": [],
//     "newline-after-var": [],
//     "newline-before-return": [],
//     "newline-per-chained-call": [],
//     "no-array-constructor": [],
//     "no-bitwise": [],
//     "no-continue": [],
//     "no-inline-comments": [],
//     "no-lonely-if": [],
//     "no-mixed-operators": [],
//     "no-mixed-spaces-and-tabs": [],
//     "no-multiple-empty-lines": [],
//     "no-negated-condition": [],
//     "no-nested-ternary": [],
//     "no-new-object": [],
//     "no-plusplus": [],
//     "no-restricted-syntax": [],
//     "no-tabs": [],
//     "no-ternary": [],
//     "no-trailing-spaces": [],
//     "no-underscore-dangle": [],
//     "no-unneeded-ternary": [],
//     "no-whitespace-before-property": [],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": {
          "multiline": true,
          "minProperties": 1,
        },
        // "ObjectPattern": {
        //   "multiline": true,
        //   "minProperties": 1,
        // },
      },
    ],
//     "object-curly-spacing": [],
//     "object-property-newline": [],
//     "one-var-declaration-per-line": [],
//     "one-var": [],
//     "operator-assignment": [],
//     "operator-linebreak": [],
//     "padded-blocks": [],
//     "quote-props": [],
//     "quotes": [],
//     "require-jsdoc": [],
//     "semi-spacing": [],
//     "semi": [],
//     "sort-keys": [],
//     "sort-vars": [],
//     "space-before-blocks": [],
//     "space-before-function-paren": [],
//     "space-in-parens": [],
//     "space-infix-ops": [],
//     "space-unary-ops": [],
//     "spaced-comment": [],
//     "unicode-bom": [],
//     "wrap-regex": [],

  // ECMAScript 6
//     "arrow-body-style": [],
//     "arrow-parens": [],
//     "arrow-spacing": [],
//     "constructor-super": [],
//     "generator-star-spacing": [],
//     "no-class-assign": [],
//     "no-confusing-arrow": [],
//     "no-const-assign": [],
//     "no-dupe-class-members": [],
    "no-duplicate-imports": [ // [1]
      "error",
      {
        "includeExports": true,
      }
    ],
//     "no-new-symbol": [],
//     "no-restricted-imports": [],
//     "no-this-before-super": [],
//     "no-useless-computed-key": [],
//     "no-useless-constructor": [],
//     "no-useless-rename": [],
//     "no-var": [],
//     "object-shorthand": [],
//     "prefer-arrow-callback": [],
//     "prefer-const": [],
//     "prefer-numeric-literals": [],
//     "prefer-rest-params": [],
//     "prefer-spread": [],
//     "prefer-template": [],
//     "require-yield": [],
//     "rest-spread-spacing": [],
//     "sort-imports": [],
//     "symbol-description": [],
//     "template-curly-spacing": [],
//     "yield-star-spacing": [],
  },
};

// [1]: Google officially doesn't support import/exports.
//      Consequently, having an import in error is /definitely/ an error.
// [2]: Google also enforces that no-curlies must be mono-line, must improve
//      clarity. For IF blocks, they must not contain an ELSE.

(function() {
  const KW = require('./keywords');

  var schema = {
    Users: {
      username: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      realName: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.OPTIONAL
      }
    },

    Commits: {
      version: {
        [KW.PROPERTIES]: KW.REQUIRED
      },
      userId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Users'
        }
      },
      comment: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.OPTIONAL
      },
      time: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: KW.REQUIRED
      }
    },

    Repositories: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      commitId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Commits'
        }
      }
    },

    Paths: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      }
    },

    Files: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      pathId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Paths'
        }
      }
    },

    Types: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      longName: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      number: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: KW.REQUIRED
      }
    },

    Extensions: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      }
    },

    Rules: {
      name: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      typeId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Types'
        }
      },
      extensionId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.OPTIONAL]: true,
          [KW.FOREIGN]: 'Extensions'
        }
      },
      repositoryId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Repositories'
        }
      }
    },

    Violations: {
      content: {
        [KW.TYPE]: KW.TEXT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      line: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      position: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: KW.REQUIRED
      },
      fileId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Files'
        }
      },
      ruleId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Rules'
        }
      },
      startCommitId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.FOREIGN]: 'Commits'
        }
      },
      endCommitId: {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.OPTIONAL]: true,
          [KW.FOREIGN]: 'Commits'
        }
      }
    }
  };

  for (let table in schema) {
    if (schema.hasOwnProperty(table)) {
      let schemum = schema[table];
      // Make sure we have a uniform properties entry.
      for (let column in schemum) {
        if (schemum.hasOwnProperty(column) &&
            typeof schemum[column][KW.PROPERTIES] === 'string') {
          schemum[column][KW.PROPERTIES] = {
            [schemum[column][KW.PROPERTIES]]: true
          };
        }
      }
      // Add the id column to everything.
      schemum.id = {
        [KW.TYPE]: KW.INT,
        [KW.PROPERTIES]: {
          [KW.REQUIRED]: true,
          [KW.PRIMARY]: true
        }
      };
    }
  }

  module.exports = schema;
})();

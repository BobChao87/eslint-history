# How the Database Works

ESLint History stores all of its historical records and meta data in a SQLite3 database, in part because having a dependency on SQLite3 is easy resolvable through libraries rather than requiring the user to install a particular database engine and have it running while ESLint History is running. SQLite3 also allows simple dependency resolution when transferring the same database across, potentially, different installs.

## All tables
* `id`: Automatically increasing index. Used for generic references.

## `Users`
* `username`: Source control user name.
* `realName`: Optional. Real name.

## `Commits`
* `version`: Value denoting version.
  * For instance, svn would have a version number, git would have a commit hash.
* `userId`: References `Users`. Person responsible for this commit.
* `comment`: Optional. Commit comment.
* `time`: Time the event occurred. Unix timestamp, in milliseconds.
  * This is not a `DATETIME` column, but instead an `INTEGER`, to allow the application to better handle it.

## `Repositories`
* `name` Name of the respository. Typically the highest possible folder name.
* `commitId`: References `Commits`. Used to track the current commit number for stuff like "next" commit access.

## `Paths`
* `name`: Folder name/path. Unix style seperation.

## `Files`
* `name`: File name.
* `pathId`: References `Paths`. Location of this file.

## `Types`
* `name`: The English name of the type. i.e. "Error" or "Warn".
* `longName`: Unabbreviated version of the `name`. i.e. "Error" or "Warning".
* `number`: The shortcut numerical version of the name. i.e. 2 or 1

## `Extensions`
* `name`: Name of the extension prefix. i.e. For "angular/log" this would be "angular".

## `Rules`
* `name`: Name of the rule. For extensions, stuff like "angular/log" will have "log" here and an `extensionId`.
* `typeId`: References `Types`. Describes severity of rule violation.
* `extensionId`: Optional. References `Extensions`. Says which extension this rule belongs to, if relevant.
* `respositoryId`: References `Repositories`. Respository to which this rule belongs.

## `Violations`
* `content`: Full contents of the line causing the violation.
* `line`: Line number this violation was reported on.
* `position`: Location in the line this violation was reported at.
* `fileId`: References `Files`. File in which this violation was reported in.
* `ruleId`: References `Rules`. Rule which was violated.
* `startCommitId`: References `Commits`. Commit in which this violation first occurred.
* `endCommitId`: Optional. References `Commits`. Commit in which this violation was removed, if any.

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

## `Paths`
* `name`: Folder name/path. Unix style seperation.

## `Files`
* `name`: File name.
*

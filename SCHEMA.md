# How the Database Works

ESLint History stores all of its historical records and meta data in a SQLite3 database, in part because having a dependency on SQLite3 is easy resolvable through libraries rather than requiring the user to install a particular database engine and have it running while ESLint History is running.

const sqlite3 = require("sqlite3").verbose();

// for debugger 
// const dbSource = "D:\\01_Dev\\Frontend dev\\01_apps\\for-student\\server\\db.sqlite"

const dbSource = "db.sqlite";

const db = new sqlite3.Database(dbSource, (error) => {
  if (error) {
    return console.log(error.message);
  } else {
    console.log("connection successful");
  }
});

module.exports = db;

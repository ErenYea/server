const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "scrapper",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
    if (err) {
      console.log("Not seccess", err);
    } else {
      console.log("sucess");
    }
  });

module.exports = mysqlConnection
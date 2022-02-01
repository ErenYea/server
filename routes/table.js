var express = require('express');
const mysqlConnection = require('./mysqlconnect')
var router = express.Router();

router.get('/',(req, res, next)=>{
    const gettablenames = () => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query("show full tables where Table_type != 'VIEW';", (err, rows, fields) => {
          if (err) {
            console.log("First Function", err);
            reject(err);
          } else {
            rows.forEach(element => {
              delete element.Table_type;
            });
            resolve(rows);
          }
        });
      });
    };
    const getcolumndata = (element, key) => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query(
          `SELECT * from ${element[key]}`,
          (err, rows, fields) => {
            if (err) {
              console.log("Second function", err);
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    };
    const allfunct = async () => {
      var tablenames = [];
      var data = [];
      var array_of_table = await gettablenames();
      // if(req.cookies.user!='admin'){
      //   array_of_table.pop();
      // }
      for (element of array_of_table) {
        for (key in element) {
          tablenames.push(element[key]);
          var object_of_data = await getcolumndata(element, key);
          data.push(object_of_data);
        }
      }
      var newarr = [tablenames, data];
      return newarr;
    };

    const start = async () => {
      var newarr = await allfunct();
      var tablenames = newarr[0];
      var data = newarr[1];
      console.log(data);
      res.send([{data: data}, {tablenames: tablenames}])
    };
    start();
  

})

module.exports = router;
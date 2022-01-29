var express = require('express');
const mysqlConnection = require('./mysqlconnect')
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  // res.send([{username: username, password: password}])
  mysqlConnection.query(
      `select * from user where username = '${username}' and password = '${password}'`,
      (err, rows, fields) => {
        if(err){
          res.send({status: 404, message:err})
        }
        if (rows.length === 0 || err) {
          res.send([{status:false}]);
        } else {
          data = rows[0];
          stat = "active";
          res.send([{status:true}]);
         
        }
      }
  )
});

module.exports = router;

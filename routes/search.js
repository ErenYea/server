var express = require('express');
const mysqlConnection = require('./mysqlconnect')
var router = express.Router();
router.post('/', function(req, res, next) {
  const te = req.body.te;
//   const password = req.body.password;
  // res.send([{username: username, password: password}])
  mysqlConnection.query(
      `select * from products where product_title = '${te}'`,
      (err, rows, fields) => {
        if(err){
          res.send({status: 404, message:err})
        }
        if (rows.length === 0 || err) {
          res.send([{status:false}]);
        } else {
          data = rows[0];
          stat = "active";
          res.send([{status:true,data:data}]);
         
        }
      }
  )
});

module.exports = router;
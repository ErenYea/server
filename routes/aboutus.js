var data= require("./about")
var express = require('express');
const mysqlConnection = require('./mysqlconnect')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;
var express = require('express');
var router = express.Router();
let db = require('../../config/mysql');
router.post('/', function(req, res, next) {
    // console.log(123)
    db.query('select * from teacher',function(err,data){
      console.log(data);
       res.send(data)
    })
  });
  
  module.exports = router;
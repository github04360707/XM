var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
	
  // res.render('index', { title: 'Express' });
  db.query('select count(*) as alls from teacher',function(err,data){
    console.log(data)
    res.send(data)
  })
});

module.exports = router;
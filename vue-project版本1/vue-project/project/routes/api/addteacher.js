var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
	
  // res.render('index', { title: 'Express' });
  let {name,subject,gender,jobNumber,position,status} = req.body;
  db.query('insert into teacher value(null,?,?,?,?,?,?)',[name,subject,gender,jobNumber,position,status],function(err,data){
  	console.log(data)
  	let obj = {}
  	if(data.affectedRows==1){
  		obj.msg = '添加成功'
  		obj.states = 'ok'
  	}else{
  		obj.msg = '添加失败'
  		obj.states = 'no'
  	}
  	res.send(obj)
  })
});

module.exports = router;
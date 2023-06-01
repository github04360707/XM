var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
	
  // res.render('index', { title: 'Express' });
  let {name,age,classNum,gender,homeNumber,jobNumber,state} = req.body;
  db.query('insert into student value(null,?,?,?,?,?,?,?)',[name,age,classNum,gender,homeNumber,jobNumber,state],function(err,data){
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
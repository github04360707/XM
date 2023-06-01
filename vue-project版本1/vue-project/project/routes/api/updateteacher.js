var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
	
  // res.render('index', { title: 'Express' });
  let {id,subject,position,status} = req.body;
  db.query('update teacher set subject=?,position=?,status=? where id=?',[subject,position,status,id],function(err,data){
  	console.log(data)
	console.log(err)
  	let obj = {}
  	if(data.affectedRows==1){
  		obj.msg = '修改成功'
  		obj.states = 'ok'
  	}else{
  		obj.msg = '修改失败'
  		obj.states = 'no'
  	}
  	res.send(obj)
  })
});

module.exports = router;
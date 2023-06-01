var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
	
  // res.render('index', { title: 'Express' });
  let {id,status} = req.body;
  db.query('update classroom set status=? where id=?',[status,id],function(err,data){
  	console.log(data)
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
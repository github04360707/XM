var express = require('express');
var router = express.Router();
let db = require('../../config/mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
	let {Id}=req.body;
	console.log(Id)
  // res.render('index', { title: 'Express' });
  db.query('delete from student where id=?',[Id],function(err,data){
    console.log(data)
    
	let obj = {}
	if(data.affectedRows==1){
		obj.msg = '删除成功'
		obj.states = 'ok'
	}else{
		obj.msg = '删除失败'
		obj.states = 'no'
	}
	res.send(obj)
  })
});

module.exports = router;
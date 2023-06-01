var express = require('express');
var router = express.Router();
let db = require('../../config/mysql');
let {key,outtime} = require('../../config/store');
let jwt = require('jsonwebtoken');
/* GET home page. */
router.post('/', function(req, res, next) {
  let main=req.body;
  
console.log(main,123);
  
  db.query("select * from accountzou where account1=?",[main.num1],function(err,data){
    let goods={}
    goods=data
    console.log(goods,456);
   let xy={};
   if(goods==!true){
    xy={msg:'登录失败',states:0}
   
   }else{
    if(main.num1==goods[0].account1&&main.num2==goods[0].password1){
      let token = jwt.sign(req.body,key,{expiresIn:outtime});
   xy={msg:'登录成功',states:1,token}
    }else{
      xy={msg:'登录失败',states:0}
    }
   }
    res.send(xy) 
		
	})
 
});

module.exports = router;
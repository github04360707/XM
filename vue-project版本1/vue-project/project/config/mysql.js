let mysql = require('mysql');
let db = mysql.createConnection({
	host:'47.108.231.124',
	port:'3306',
	user:'root',
	password:'zoujunjie',
	database:'studentsRMS'
})
db.connect();
module.exports = db;

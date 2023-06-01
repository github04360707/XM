var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let expressJWT = require('express-jwt');
let {key,outtime} = require('./config/store');

var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/api/users');
var addstudentRouter = require('./routes/api/addstudent');
var remstudentRouter = require('./routes/api/remstudent');
var addteacherRouter = require('./routes/api/addteacher');
var remteacherRouter = require('./routes/api/remteacher');
var teacherallRouter = require('./routes/api/teacherall');
var studentallRouter = require('./routes/api/studentall');
var updatestudentRouter = require('./routes/api/updatestudent');
var updateteacherRouter = require('./routes/api/updateteacher');
var classRouter = require('./routes/api/class');
var classallRouter = require('./routes/api/classall');
var updateclassRouter = require('./routes/api/updateclass');

var getDataRouter = require('./routes/api/getData');
var verifyRouter=require('./routes/api/verify')



let cors = require('cors');
var app = express();
app.use(cors({ origin: '*' }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/getData', getDataRouter);
app.use('/api/verify', verifyRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addstudent', addstudentRouter);
app.use('/remstudent', remstudentRouter);
app.use('/addteacher', addteacherRouter);
app.use('/remteacher', remteacherRouter);
app.use('/teacherall', teacherallRouter);
app.use('/studentall', studentallRouter);
app.use('/updatestudent', updatestudentRouter);
app.use('/updateteacher', updateteacherRouter);
app.use('/updateclass', updateclassRouter);
app.use('/class', classRouter);
app.use('/classall', classallRouter);


app.use(expressJWT.expressjwt({
  secret:key,
  algorithms:['HS256']
}).unless({
  path:[]
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // console.log(err)
  if(err.name==='UnauthorizedError'){
    res.send({code:-1,msg:'token验证失败'})
  }else{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});
module.exports = app;

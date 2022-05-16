var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
//주소를 차는 것을 routing. 
var usersRouter = require('./routes/users');
const testRouter = require('./routes/call');
const postRouter = require('./routes/post');
const blogRouter = require('./routes/blog');
const dbconnect = require('./models/index');
dbconnect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

//get post, put, delete

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
//localhost:3000/expost
app.use('/expost', postRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app.js에서 사용하는 app.use로 활용하는 router와
// router.js에서 사용하는 cotroller와 차이가 있을까요?

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

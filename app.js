var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(DB);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('fonts', path.join(__dirname, 'fonts'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/images", express.static(__dirname + '/public/images'))
app.use("/public/images/photos", express.static(__dirname + '/public/images/photos'))
app.use("/public/images/predictions", express.static(__dirname + '/public/images/predictions'))
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/test', indexRouter);
app.use('/users', usersRouter);
app.use('/annotate', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

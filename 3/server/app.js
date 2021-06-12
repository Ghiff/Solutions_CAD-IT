var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Mongoose = require('mongoose');

var dataRouter = require('./routes/dataRouter');

var app = express();

var mongoUrl = 'mongodb://localhost:27017/dataMockup'

var connect = Mongoose.connect(mongoUrl);

connect.then((db)=>{
    console.log('Successfully connected to dbs MongoDB');
},
    (err)=>{
        console.log('Failed to connect, Error : ',err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var defaultRouter = express.Router();

defaultRouter.use('/data', dataRouter);

app.use('/api/v.1', defaultRouter);

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

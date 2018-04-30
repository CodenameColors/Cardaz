var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors'); //allows the client to acces the REST API for xmlhttprequests

var app = express();

app.use(cors({credentials: true, origin: true})); //by pass the the cors.


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/users', usersRouter);


app.use(express.static('public'));
app.use('/*', (req,res) => res.sendFile(_dirname +'/public/index.html'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//dev error handler prints the stack trace
if(app.get('env') === 'development'){
	app.use(function(err,req,res,next) {
		res.status(err.code || 500)
		.json({
			status: 'error',
			message: err
		});
	});
}

//production error handler. no stack traces for the user to see
app.use(function(err,req,res,next) {
	res.status(err.status || 500)
	.json({
		status: 'error',
		message: err.message
	});
});

module.exports = app;

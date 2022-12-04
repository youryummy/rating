var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ratings = require('./routes/ratings');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/ratings', ratings);

//setup connection to mongo
const mongoose = require('mongoose');
const DB_URL = (process.env.DV_URL || 'mongodb://localhost/test')

mongoose.connect(DB_URL);
const db = mongoose.connection;

//recocer from errors
db.on('error', console.error.bind(console, 'db connection error'));


module.exports = app;

// app.js
var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
let mustacheExpress = require('mustache-express');

let indexRoute = require('./src/index');
let coursesRoute = require('./src/courses');
let contactRoute = require('./src/contact');
let virtualClassesRoute = require('./src/virtualClasses');

var app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use (bodyParser.urlencoded( {extended : true} ) );

app.use(bodyParser.urlencoded({extended: true}));

app.use ('/', indexRoute);
app.use ('/', coursesRoute);
app.use ('/', contactRoute);
app.use ('/', virtualClassesRoute);

app.get('/css/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/js/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/images/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/js/greensock/:remaining', function(req, res) {
  console.log("remaining - " + req.params.remaining );
  res.sendFile(__dirname + "/public/js/greensock/" + req.params.remaining );
});

app.get('/:lang/:page', function (req, res) {
  res.sendFile(__dirname + "/public/lang/" + req.params.lang + "/" + req.params.page);
});

app.listen(3000,function() {
  console.log("Server started");
});

module.exports = app;
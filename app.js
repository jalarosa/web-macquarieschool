// app.js
var express = require('express');
var bodyParser = require('body-parser');
let mustacheExpress = require('mustache-express');

let indexRoute = require('./src/index');
let coursesRoute = require('./src/courses');
let contactRoute = require('./src/contact');
let virtualClassesRoute = require('./src/virtualClasses');
let assetsRoute = require('./src/assets');

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
app.use ('/', assetsRoute);

app.listen(3000,function() {
  console.log("Server started");
});

module.exports = app;
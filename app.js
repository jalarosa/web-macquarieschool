// app.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.redirect("/es/home.html");
});

app.get('/css/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/js/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/images/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/es/js/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/es/css/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/es/images/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/en/images/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/en/css/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/js/greensock/:remaining', function(req, res) {
  console.log("remaining" + req.params.remaining );
  res.sendFile(__dirname + "/public/js/greensock/" + req.params.remaining );
});

app.get('/en/js/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/es/:remaining', function (req, res) {
  console.log("remaining" + req.params.remaining);
  res.sendFile(__dirname + "/public/lang/es/" + req.params.remaining);
});



app.get('/:lang/:page', function (req, res) {
  res.sendFile(__dirname + "/public/lang/" + req.params.lang + "/" + req.params.page);
});

app.listen(3000);

module.exports = app;
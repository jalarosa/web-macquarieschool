// app.js
var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
let mustacheExpress = require('mustache-express');

let indexRoute = require('./index');
let coursesRoute = require('./courses');

var app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use (bodyParser.urlencoded( {extended : true} ) );

app.use(bodyParser.urlencoded({extended: true}));

app.use ('/', indexRoute);
app.use ('/', coursesRoute);

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

app.get('/es/js/:remaining', function (req, res) {
  console.log("remaining- " + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/es/css/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/es/images/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/en/images/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/images/" + req.params.remaining);
});

app.get('/en/css/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/css/" + req.params.remaining);
});

app.get('/js/greensock/:remaining', function(req, res) {
  console.log("remaining - " + req.params.remaining );
  res.sendFile(__dirname + "/public/js/greensock/" + req.params.remaining );
});

app.get('/en/js/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/js/" + req.params.remaining);
});

app.get('/es/:remaining', function (req, res) {
  console.log("remaining - " + req.params.remaining);
  res.sendFile(__dirname + "/public/lang/es/" + req.params.remaining);
});

app.post('/en/contact.html', function(req, res) {

  const emailContent = {
    name: req.body["name"],
    email: req.body["email"],
    phone: req.body["phone"],
    message: req.body["message"]
  };
  console.log(`${emailContent.name}` );
  if (!emailContent.name || !emailContent.email) {
    // res.send("Error: Email & Subject should not be Blank");
    res.redirect("/es/contact.html?status=fail");
  }
  sendMail(emailContent,res);

});

app.post('/es/contact.html', function(req, res) {

  const emailContent = {
    name: req.body["name"],
    email: req.body["email"],
    phone: req.body["phone"],
    message: req.body["message"]
  };
  console.log(`${emailContent.name}` );
  if (!emailContent.name || !emailContent.email) {
    // res.send("Error: Email & Subject should not be Blank");
    res.redirect("/es/contact.html?status=fail");
  }
  sendMail(emailContent,res);

});

async function sendMail(emailContent,res){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "ci6.toservers.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'contacto@macquarieschool.com.ar',
      pass: 'Z2&HZZd;&ua&'
    }
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `${emailContent.name} - <${emailContent.email}>`,
    to: 'contacto@macquarieschool.com.ar',
    subject: `Formulario de contacto de: ${emailContent.name} - ${emailContent.phone}`,
    html: `<b>${emailContent.message}<b>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.redirect("/es/contact.html?status=success");
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


app.get('/:lang/:page', function (req, res) {
  res.sendFile(__dirname + "/public/lang/" + req.params.lang + "/" + req.params.page);
});

app.listen(3000,function() {
  console.log("Server started");
});

module.exports = app;
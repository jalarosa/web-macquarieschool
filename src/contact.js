let router = require('express').Router();
let storage = require('./simpleStorage');
const nodemailer = require("nodemailer");

router.get('/contact', function(request,response) {
    let languaje = request.query.lang || storage.getLanguaje();
    let data = storage.getData(languaje);
    let menu = storage.getMenu(3, languaje);
    response.render('contact', {"page_title": "Contact", menu: menu, data: data});
});

router.post('/contact', function(req, res) {

    const emailContent = {
      name: req.body["name"],
      email: req.body["email"],
      phone: req.body["phone"],
      message: req.body["message"]
    };
    console.log(`${emailContent.name}` );
    if (!emailContent.name || !emailContent.email) {
      // res.send("Error: Email & Subject should not be Blank");
      res.redirect("/contact?status=fail");
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
        res.redirect("/contact?status=success");
      }
    });
  
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
  
module.exports = router;
import { Request, Response } from 'express';
import { setLanguaje , getLanguaje, getData, getMenu } from '../../simpleStorage';
import * as nodemailer  from 'nodemailer';

export class ContactController {

    public getContact (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        const menu = getMenu(3, languaje);
        response.render('contact', {"page_title": "Contact", menu, data});
    }

    public postContact (request: Request, response: Response) {
        const emailContent = {
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            message: request.body.message
        };
        console.log(`${emailContent.name}` );
        if (!emailContent.name || !emailContent.email) {
            // res.send("Error: Email & Subject should not be Blank");
            response.redirect("/contact?status=fail");
        }
        this.sendMail(emailContent,response);
    }

    async sendMail(emailContent,res) {

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
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
        const mailOptions = {
          from: `${emailContent.name} - <${emailContent.email}>`,
          to: 'contacto@macquarieschool.com.ar',
          subject: `Formulario de contacto de: ${emailContent.name} - ${emailContent.phone}`,
          html: `<b>${emailContent.message}<b>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            res.json({
              msg: 'fail'
            })
          } else {
            res.redirect("/contact?status=success");
          }
        });
    }

}
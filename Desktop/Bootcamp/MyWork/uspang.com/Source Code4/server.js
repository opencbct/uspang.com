const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'sender id',
        to: 'reciever id',
        subject: 'Postfolio',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('opps! it seems like some error occured plz. try again.')
        } else{
            res.json('thanks for e-mailing me. I will reply to you within 2 working days');
        }
    })
})

app.listen(3000, () => {
    console.log('listening.....');
})
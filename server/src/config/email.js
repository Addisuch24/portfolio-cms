const nodemailer = require("nodemailer");
const config = require("./env");

const transporter = nodemailer.createTransport({

    host: config.EMAIL_HOST,

    port: config.EMAIL_PORT,

    secure: false,

    auth:{

        user:config.EMAIL_USER,

        pass:config.EMAIL_PASSWORD

    }

});

module.exports=transporter;
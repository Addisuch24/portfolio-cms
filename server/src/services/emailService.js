const transporter=require("../config/email");
const config=require("../config/env");

class EmailService{

async sendContactNotification(contact){

await transporter.sendMail({

from:config.EMAIL_FROM,

to:config.EMAIL_USER,

subject:`📩 New Portfolio Message: ${contact.subject}`,

html:`

<h2>New Contact Message</h2>

<p><strong>Name:</strong> ${contact.name}</p>

<p><strong>Email:</strong> ${contact.email}</p>

<p><strong>Subject:</strong> ${contact.subject}</p>

<p><strong>Message:</strong></p>

<p>${contact.message}</p>

`

});

}

}

module.exports=new EmailService();
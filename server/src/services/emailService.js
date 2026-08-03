const transporter = require("../config/email");
const config = require("../config/env");

class EmailService {
  async sendContactNotification(contact) {
    const isPlaceholder = (value) => !value || /your[-_ ]?(real|app|smtp|email|password)/i.test(value);

    if (!config.EMAIL_HOST || !config.EMAIL_USER || !config.EMAIL_PASSWORD || isPlaceholder(config.EMAIL_HOST) || isPlaceholder(config.EMAIL_USER) || isPlaceholder(config.EMAIL_PASSWORD)) {
      throw new Error("SMTP credentials are not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, and EMAIL_FROM in the server environment.");
    }

    const from = config.EMAIL_FROM || config.EMAIL_USER;
    const to = config.EMAIL_TO || config.EMAIL_USER;

    await transporter.sendMail({
      from,
      to,
      subject: `📩 New Portfolio Message: ${contact.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
    });
  }
}

module.exports = new EmailService();
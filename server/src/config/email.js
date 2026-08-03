const nodemailer = require("nodemailer");
const config = require("./env");

const host = config.EMAIL_HOST || "smtp.gmail.com";
const port = Number(config.EMAIL_PORT || 587);
const secure = String(config.EMAIL_SECURE || "").toLowerCase() === "true" || port === 465;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
  requireTLS: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

module.exports = transporter;
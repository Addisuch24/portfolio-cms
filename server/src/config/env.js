const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const fallbackEnvPath = path.resolve(__dirname, "../../.env");
if (!process.env.JWT_SECRET && envPath !== fallbackEnvPath) {
  dotenv.config({ path: fallbackEnvPath });
}

const DEFAULT_JWT_SECRET = "change_this_to_a_long_random_string";

const config = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_TO: process.env.EMAIL_TO,
};

module.exports = config;